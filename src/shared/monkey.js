import * as Kefir from "kefir"
import K          from "karet.util"

const o = Kefir.Observable.prototype

o.startWith = function (v) {
  return Kefir.constant(v).concat(this)
}

o.into = function (settable) {
  return K(this, v => {
    settable.set(v)
    return null
  }).startWith(null)
}
