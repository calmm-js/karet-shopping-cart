import * as R    from "ramda"
import K, * as U from "karet.util"
import P, * as L from "partial.lenses"
import React     from "karet"

import Counter from "./counter"

const name = U.view("name")
const count = (item, cart) =>
  U.view(P(L.find(R.whereEq({id: item.id})),
           L.defaults(item),
           "count",
           L.defaults(0),
           L.normalize(R.max(0))),
         cart)

export default cart => ({item}) =>
  <li>
    {K(item, item => <Counter count={count(item, cart)}/>)}
    {name(item)}
  </li>
