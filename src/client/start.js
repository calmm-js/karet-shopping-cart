import "../shared/monkey"

import Atom     from "kefir.atom"
import React    from "karet"
import ReactDOM from "react-dom"

import App from "../components/app"

export const state = Atom({})

ReactDOM.render(<App {...{state}}/>, document.getElementById("app"))
