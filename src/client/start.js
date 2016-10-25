import * as U   from "karet.util"
import React    from "karet"
import ReactDOM from "react-dom"

import App from "../components/app"

export const state = U.atom({})

ReactDOM.render(<App {...{state}}/>, document.getElementById("app"))
