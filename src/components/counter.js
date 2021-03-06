import * as R     from "ramda"
import * as React from "karet"

export default ({count}) =>
  <span>
    <button onClick={() => count.modify(R.add(-1))}>-</button>
    {count}
    <button onClick={() => count.modify(R.add(+1))}>+</button>
  </span>
