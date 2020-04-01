import {Component, ReactNode} from 'react'
import PropTypes from 'prop-types'

const date = 'performance' in window ? window.performance : Date

export type DefProps = {
  children: ReactNode,
  placeholder?: ReactNode
}

export default class Def extends Component<DefProps> {
  static propTypes = {
    children: PropTypes.node.isRequired,
    placeholder: PropTypes.node
  }
  static defaultProps = {
    placeholder: null
  }
  static timer: number
  static currentDef: Def
  static stack: Set<Def> = new Set()
  static start () {
    if (!this.timer && this.stack.size) {
      this.timer = setTimeout(() => {
        const redLine = date.now() + 17
        while (this.stack.size && date.now() < redLine) {
          this.render()
        }
        this.timer = undefined
        this.start()
      })
    }
  }
  static render () {
    if (this.stack.size) {
      const Async = this.stack.values().next().value
      this.currentDef = Async
      this.stack.delete(Async)
      Async.forceUpdate()
    } else {
      this.currentDef = undefined
    }
  }
  componentWillUnmount () {
    Def.stack.delete(this)
  }
  render () {
    if (Def.currentDef === this) {
      return this.props.children
    }
    Def.stack.add(this)
    Def.start()
    return this.props.placeholder
  }
}
