import * as R             from "ramda"
import K                  from "karet.util"
import P, * as L          from "partial.lenses"
import React, {fromKefir} from "karet"

import Counter from "./counter"

const count = item =>
  P(L.find(R.whereEq({id: item.id})),
    L.defaults(item),
    "count",
    L.defaults(0),
    L.normalize(R.max(0)))

export default cart => ({item}) => fromKefir(K(item, item =>
  <li>
    <Counter count={cart.lens(count(item))}/>
    {item.name}
  </li>))
