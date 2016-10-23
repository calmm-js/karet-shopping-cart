import React from "karet"

export default ({removable}) =>
  <button onClick={() => removable.remove()}>x</button>
