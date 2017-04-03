import * as U from "karet.util"
import * as L from "partial.lenses"
import React  from "karet"

import Counter from "./counter"
import Remove  from "./remove"

const name = U.view("name")

const count =
  U.view([L.removable("count"),
          "count",
          L.defaults(0)])

export default ({item}) =>
  <div>
    <Remove removable={item}/>
    <Counter count={count(item)}/>
    {name(item)}
  </div>
