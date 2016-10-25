import * as U    from "karet.util"
import P, * as L from "partial.lenses"
import React     from "karet"

import Counter from "./counter"
import Remove  from "./remove"

const name = U.view("name")
const count =
  U.view(P(L.choose((props = {}) => L.defaults({...props, count: 0})),
           "count"))

export default ({item}) =>
  <li>
    <Remove removable={item}/>
    <Counter count={count(item)}/>
    {name(item)}
  </li>
