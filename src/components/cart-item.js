import P, * as L from "partial.lenses"
import React     from "karet"

import Counter from "./counter"
import Remove  from "./remove"

export const name = "name"
export const count =
  P(L.choose(({count: _, ...rest} = {}) => L.defaults({count: 0, ...rest})),
    "count")

export default ({item}) =>
  <li>
    <Remove removable={item}/>
    <Counter count={item.lens(count)}/>
    {item.view(name)}
  </li>
