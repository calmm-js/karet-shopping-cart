import * as L   from "partial.lenses"
import * as U   from "karet.util"
import React    from "karet"
import {render} from "react-dom"

import App from "../components/app"

const state = U.atom({})

if (process.env.NODE_ENV !== "production") {
  window.L = L
  window.U = U
  window.state = state
}

render(<App state={state}/>, document.getElementById("app"))
