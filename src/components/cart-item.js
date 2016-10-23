import P, * as L from "partial.lenses"
import React     from "karet"

import Counter from "./counter"
import Remove  from "./remove"

const cartCount =
  P(L.choose((props = {}) => L.defaults({...props, count: 0})),
    "count")

export default ({item}) =>
  <li>
    <Remove removable={item}/>
    <Counter count={item.lens(cartCount)}/>
    {item.view("name")}
  </li>
