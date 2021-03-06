import * as L     from "partial.lenses"
import * as React from "karet"
import * as U     from "karet.util"

import CartItem    from "./cart-item"
import Items       from "./items"
import ProductItem from "./product-item"

const productsData = [
  {id: 1, name: "Sinertävä lenkki 500g"},
  {id: 2, name: "Maksainen laatikko 400g"},
  {id: 3, name: "Maitoa etäisesti muistuttava juoma 0.9l"},
  {id: 4, name: "Festi moka kaffe 500g"},
  {id: 5, name: "Niin hyvä voffeli ettei saa 55g"},
  {id: 6, name: "Suklainen Japanilainen viihdyttäjä 37g"}
]

const products =
  U.seq(productsData,
        U.map(U.later(1000)),
        U.serially,
        U.foldPast((xs, x) => U.append(x, xs), []))

export default ({state, cart = U.view(["cart", L.define([])], state)}) =>
  <div>
    <h1>Karet (toy) Shopping Cart example</h1>
    <a href="https://github.com/calmm-js/karet-shopping-cart">GitHub</a>
    <div className="panels">
      <div className="panel">
        <h2>Products</h2>
        <Items Item={ProductItem(cart)} items={products}/>
      </div>
      <div className="panel">
        <h2>Shopping Cart</h2>
        <Items Item={CartItem} items={cart}/>
      </div>
    </div>
  </div>
