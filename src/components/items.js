import React             from "karet"
import K, {fromIds, idx} from "karet.util"

import * as U from "../shared/util"

export default ({items, Item}) =>
  <ul>
    {fromIds(K(items, U.mapi(idx("id"))), ix =>
             <Item key={ix.id} item={items.lens(ix.index)}/>)}
  </ul>
