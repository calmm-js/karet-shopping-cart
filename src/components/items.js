import * as U from "karet.util"
import React  from "karet"

export default ({items, Item}) =>
  <ul>
    {U.seq(items,
           U.mapIndexed(U.idx("id")),
           U.mapCached(ix =>
             <Item key={ix.id} item={U.view(ix.index, items)}/>))}
  </ul>
