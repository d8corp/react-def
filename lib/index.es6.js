import { Component } from 'react';
import PropTypes from 'prop-types';

const date = 'performance' in window ? window.performance : Date;
class Def extends Component {
    static start() {
        if (!this.timer && this.stack.size) {
            this.timer = setTimeout(() => {
                const redLine = date.now() + 17;
                while (this.stack.size && date.now() < redLine) {
                    this.render();
                }
                this.timer = undefined;
                this.start();
            });
        }
    }
    static render() {
        if (this.stack.size) {
            const Async = this.stack.values().next().value;
            this.currentDef = Async;
            this.stack.delete(Async);
            Async.forceUpdate();
        }
        else {
            this.currentDef = undefined;
        }
    }
    componentWillUnmount() {
        Def.stack.delete(this);
    }
    render() {
        if (Def.currentDef === this) {
            return this.props.children;
        }
        Def.stack.add(this);
        Def.start();
        return this.props.placeholder;
    }
}
Def.propTypes = {
    children: PropTypes.node.isRequired,
    placeholder: PropTypes.node
};
Def.defaultProps = {
    placeholder: null
};
Def.stack = new Set();

export default Def;
