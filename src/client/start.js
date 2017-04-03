import * as U   from "karet.util"
import React    from "karet"
import {render} from "react-dom"

import App from "../components/app"

export const state = U.atom({})

render(<App state={state}/>, document.getElementById("app"))
