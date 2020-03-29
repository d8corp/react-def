import ReactDom from 'react-dom'
import React, {Component, ReactElement} from 'react'
import Def from '.'

function render (component: ReactElement): HTMLDivElement {
  const div = document.createElement('div')
  ReactDom.render(component, div)
  return div
}

describe('Def', () => {
  test('after render', async () => {
    const div = render(
      <Def>
        test
      </Def>
    )
    expect(div.innerHTML).toBe('')
    await new Promise(resolve => setTimeout(resolve))
    expect(div.innerHTML).toBe('test')
  })
  test('predefine', async () => {
    const div = render(
      <Def element='loading...'>
        test
      </Def>
    )
    expect(div.innerHTML).toBe('loading...')
    await new Promise(resolve => setTimeout(resolve))
    expect(div.innerHTML).toBe('test')
  })
})
