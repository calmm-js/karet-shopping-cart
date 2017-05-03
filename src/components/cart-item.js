import * as L     from "partial.lenses"
import * as React from "karet"
import * as U     from "karet.util"

import Counter from "./counter"
import Remove  from "./remove"

const cartCount =
  [L.removable("count"),
   "count",
   L.defaults(0)]

export default ({item}) =>
  <div>
    <Remove removable={item}/>
    <Counter count={U.view(cartCount, item)}/>
    {U.view("name", item)}
  </div>
