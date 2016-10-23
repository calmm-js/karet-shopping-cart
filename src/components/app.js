import * as L from "partial.lenses"
import Atom   from "kefir.atom"
import React  from "karet"

import CartItem    from "./cart-item"
import Items       from "./items"
import ProductItem from "./product-item"

const products = [
  {id: 1, name: "Sinertävä lenkki 500g"},
  {id: 2, name: "Maksainen laatikko 400g"},
  {id: 3, name: "Maitoa etäisesti muistuttava juoma 0.9l"},
  {id: 4, name: "Festi moka kaffe 500g"},
  {id: 5, name: "Niin hyvä voffeli ettei saa 55g"},
  {id: 6, name: "Suklainen Japanilainen viihdyttäjä 37g"},
]

export default ({state, cart = state.lens("cart", L.define([]))}) =>
  <div>
    <h1>Karet (toy) Shopping Cart example</h1>
    <a href="https://github.com/calmm-js/karet-shopping-cart">GitHub</a>
    <div className="panels">
      <div className="panel">
        <h2>Products</h2>
        <Items Item={ProductItem(cart)} items={Atom(products)}/>
      </div>
      <div className="panel">
        <h2>Shopping List</h2>
        <Items Item={CartItem} items={cart}/>
      </div>
    </div>
  </div>
