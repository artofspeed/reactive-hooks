## Description
Easy to use global store for React, using hooks. 

## Usage

Create a reactive hook:
```javascript
import reactive from "./reactive";

const useABC = reactive({
  a: "a",
  b: "b",
  c: "c",
  changeABC() {
    this.a = this.b = this.c = 'aaaa'
  }
});
```

When any of the field, or nested field changes, all components that use those fields will re-render.
```javascript
const Component1 = () => {
  const { a, b, c, changeABC } = useABC();
  return (
    <div>
      Component1: {a}, {b}, {c}
      <button onClick={changeABC}>Click to change ABC</button>
    </div>
  );
};
```
