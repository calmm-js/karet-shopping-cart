import * as L    from "partial.lenses"
import * as R    from "ramda"
import K, * as U from "karet.util"
import React     from "karet"

import Counter from "./counter"

const name = U.view("name")
const count = U.staged(item =>
  U.view([L.find(R.whereEq({id: item.id})),
          L.defaults(item),
          "count",
          L.defaults(0),
          L.normalize(R.max(0))]))

export default cart => ({item}) =>
  <li>
    {K(item, item => <Counter count={count(item, cart)}/>)}
    {name(item)}
  </li>
