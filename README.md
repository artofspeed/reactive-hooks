## Description
Easy to use global store for React, using hooks.

## Usage Example

Create a reactive hook, add in fields, nested fields, and methods.
```javascript
import reactive from "./reactive";

const useABC = reactive({
  // fields
  a: "a",
  b: "b",
  c: "c",
  // nested fields
  docs: [
    { id: 1, name: "joe" },
    { id: 2, name: "marry" }
  ],
  // method: directly set
  changeABC() {
    this.a = this.b = this.c = parseInt(Math.random() * 100, 10);
  },
  // method: directly modify array item
  changeName() {
    this.docs[1].name = "xxxx";
  }
});
```

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
