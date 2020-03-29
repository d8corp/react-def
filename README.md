# react-def
Use the component when DOM changes or component rendering take much time.
## Installation
[npm](https://www.npmjs.com/package/react-def)
```bash
npm i react-def
```
yarn
```bash
yarn add react-def
```
## Using
You can use it thoughtlessly with elements that show self on hover only.  
The rendering of the components starts working only when the whole app be rendered and displayed.  
Then it's rendering `Def` components that much as we can to have `60fps`.
```typescript jsx
import Def from 'react-def'

const Throttling = ({value = 10, children}) => {
  const end = Date.now() + value
  while (Date.now() < end) {
    continue
  }
  return children
}

const SimpleComponent = () => (
  <div>
    {[...new Array(10)].map((v, i) => (
      <div key={i}>
        {[...new Array(10)].map((v, j) => (
          <Throttling key={j}>
            ({i}.{j})
          </Throttling>
        ))}
      </div>
    ))}
  </div>
)

const DefComponent = () => (
  <div>
    {[...new Array(10)].map((v, i) => (
      <div key={i}>
        <Def>
          {[...new Array(10)].map((v, j) => (
            <Throttling key={j}>
              ({i}.{j})
            </Throttling>
          ))}
        </Def>
      </div>
    ))}
  </div>
)
```
Try to use `SimpleComponent` and `DefComponent` and you will see the different.  
Also, you may provide `element` or `component` property to show something wile it's rendering.
```typescript jsx
const DefComponentPredefine = () => (
  <div>
    {[...new Array(10)].map((v, i) => (
      <div key={i}>
        <Def element='loading...'>
          {[...new Array(10)].map((v, j) => (
            <Throttling key={j}>
              ({i}.{j})
            </Throttling>
          ))}
        </Def>
      </div>
    ))}
  </div>
)
```
## Issues
If you find a bug, please file an issue on [GitHub](https://github.com/d8corp/react-def/issues).
