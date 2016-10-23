import {state} from "./start"

import * as L from "partial.lenses"
import Atom   from "kefir.atom"

window.Atom = Atom
window.L = L
window.state = state
