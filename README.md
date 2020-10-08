## Reactive Hooks
Easiest to use global store for React, powered by hooks. It does 2 things:
- Directly modify field values
- Used as a global store, when a field value changes, all components that use it get updated

### Usage Example

Create a reactive hook. Let's add in some fields, nested fields, and methods.
```javascript
import reactive from "./reactive";

const useABC = reactive({
  // support flat fields
  a: "a",
  b: "b",
  c: "c",
  // support nested fields
  docs: [
    { id: 1, name: "joe" },
    { id: 2, name: "marry" }
  ],
  // method: directly set
  changeABC() {
    this.a = this.b = this.c = 'aaaaa'
  },
  // method: directly modify array item
  changeName() {
    this.docs[1].name = "xxxx";
  }
});
```

### Use the hook
When any of the above fields change, all components that use those fields will re-render.
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


const Component2 = () => {
  const { a, b, c, docs, changeName } = useABC();
  return (
    <div>
      Component2: {a}, {b}, {c}
      {docs.map((doc, i) => (
        <div key={i}>name: {doc.name}</div>
      ))}
      <button onClick={changeName}>change name</button>
    </div>
  );
};
```
