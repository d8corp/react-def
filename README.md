# react-def
[![NPM](https://img.shields.io/npm/v/react-def.svg)](https://www.npmjs.com/package/react-def) [![NPM](https://img.shields.io/npm/dm/react-def.svg)](https://www.npmjs.com/package/react-def)  

Use the component when DOM changes or component rendering take a lot of time.
## Installation
```bash
npm i react-def
# or
yarn add react-def
```
## Using
The best way of using the component is to do it with elements that show self only on hover.  
The rendering of the components starts working only when the whole app will be rendered and displayed.  
Then `Def` components will render one by one as quickly as we can have `60fps`.
```typescript jsx
import Def from 'react-def'
const TEN = [...new Array(10)]


const Throttling = ({value = 10, children}) => {
  const end = Date.now() + value
  while (Date.now() < end) {
    continue
  }
  return children
}

const SimpleComponent = () => (
  <div>
    {TEN.map((v, i) => (
      <div key={i}>
        {TEN.map((v, j) => (
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
    {TEN.map((v, i) => (
      <div key={i}>
        <Def>
          {TEN.map((v, j) => (
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
Try to use the `SimpleComponent` and the `DefComponent` and you see the difference.  
Also, you can provide property of the `placeholder` to show something wile it's rendering.
```typescript jsx
const DefComponentPredefine = () => (
  <div>
    {TEN.map((v, i) => (
      <div key={i}>
        <Def placeholder='loading...'>
          {TEN.map((v, j) => (
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
