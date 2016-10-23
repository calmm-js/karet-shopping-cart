import * as R    from "ramda"
import K         from "karet.util"
import P, * as L from "partial.lenses"
import React     from "karet"

import Counter from "./counter"

const productCount = item =>
  P(L.find(R.whereEq({id: item.id})),
    L.defaults(item),
    "count",
    L.defaults(0),
    L.normalize(R.max(0)))

export default cart => ({item}) =>
  <li>
    {K(item, item =>
       <Counter count={cart.lens(productCount(item))}/>)}
    {item.view("name")}
  </li>
