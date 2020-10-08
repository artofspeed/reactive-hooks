import React, { useState } from "react";

let cnt = 0;

const loopObject = (json, fn) => {
  for (let k in json) {
    if (json.hasOwnProperty(k)) {
      fn(k, json[k])
    }
  }
  return json;
}

const bindFns = json => {
  return loopObject(json, (k, fn) => {
    if (fn instanceof Function) json[k] = fn.bind(json)
  });
};

const MakeReactive = (listeners, json) => {
  const [rerender, setRerender] = useState(cnt);
  listeners.add(setRerender);
  const handler = {
    // turn all nested fields into proxies
    get(obj, prop) {
      const val = obj[prop]
      if (typeof val === 'object' && val !== null) {
        // if already created a proxy, don't re-create it
        return val.__internal_proxy = val.__internal_proxy || new Proxy(val, handler)
      } else {
        return val;
      }
    },
    // whenever a field changes, invoke all listeners
    set: (obj, prop, value) => {
      if (prop === '__internal_proxy'){
        Object.defineProperty(obj, prop, { // hide this property
          enumerable: false,
          writable: true
        })
        return true
      }
      else if (value instanceof Function) {
        obj[prop] = value;
        return true;
      }
      obj[prop] = value;
      cnt += 1;
      listeners.forEach((fn) => fn(cnt));
      return true;
    }
  }
  return bindFns(new Proxy(json, handler));
};

const reactive = (obj) => {
  const listeners = new Set();
  return () => MakeReactive(listeners, obj);
};

export default reactive;
