import * as U from "karet.util"
import * as L from "partial.lenses"
import React  from "karet"

import Counter from "./counter"
import Remove  from "./remove"

const name = U.view("name")
const count =
  U.view([L.choose((props = {}) => L.defaults({...props, count: 0})),
          "count"])

export default ({item}) =>
  <div>
    <Remove removable={item}/>
    <Counter count={count(item)}/>
    {name(item)}
  </div>
