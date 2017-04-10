import * as L from "partial.lenses"
import * as R from "ramda"
import * as U from "karet.util"
import React  from "karet"

import Counter from "./counter"

const count = U.lift(item =>
  [L.find(R.whereEq({id: item.id})),
   L.defaults(item),
   "count",
   L.defaults(0),
   L.normalize(R.max(0))])

export default cart => ({item}) =>
  <div>
    <Counter count={U.view(count(item), cart)}/>
    {U.view("name", item)}
  </div>
