import P, * as L from "partial.lenses"
import React     from "karet"

import Counter from "./counter"
import Remove  from "./remove"

const cartCount =
  P(L.choose(({count: _, ...rest} = {}) => L.defaults({count: 0, ...rest})),
    "count")

export default ({item}) =>
  <li>
    <Remove removable={item}/>
    <Counter count={item.lens(cartCount)}/>
    {item.view("name")}
  </li>
