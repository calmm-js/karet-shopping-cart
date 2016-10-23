import * as Kefir from "kefir"

export const innerWidth =
  Kefir.fromEvents(window, "resize")
  .merge(Kefir.constant(0))
  .toProperty()
  .map(() => window.innerWidth)
  .skipDuplicates()
