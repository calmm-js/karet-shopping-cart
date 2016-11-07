import * as U from "karet.util"
import React  from "karet"

export default ({items, Item}) =>
  <div>
    {U.seq(items, U.indices, U.mapCached(i =>
           <Item key={i} item={U.view(i, items)}/>))}
  </div>
