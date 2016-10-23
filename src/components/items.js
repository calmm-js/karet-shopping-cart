import React from "karet"
import K, {
  Idx,
  fromIds
} from "karet.util"

import * as U from "../shared/util"

const idx = id => (x, i) => new Idx(x[id], i)

export default ({items, Item}) =>
  <ul>
    {fromIds(K(items, U.mapi(idx("id"))), ix =>
             <Item key={ix.id} item={items.lens(ix.index)}/>)}
  </ul>
