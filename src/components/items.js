import * as U from "karet.util"
import React  from "karet"

export default ({items, Item}) =>
  <div>
    {U.seq(items,
           U.mapElems((item, i) => <Item key={i} item={item}/>))}
  </div>
