import * as React from "karet"
import * as U     from "karet.util"

export default ({items, Item}) =>
  <div>
    {U.seq(items,
           U.mapElems((item, i) => <Item key={i} item={item}/>))}
  </div>
