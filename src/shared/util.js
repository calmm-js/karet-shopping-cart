import * as R from "ramda"

export const scope = f => f()

export const mapi = R.curry((xi2y, xs) => xs.map(xi2y))
