[![Build Status](https://travis-ci.org/calmm-js/karet-shopping-cart.svg?branch=master)](https://travis-ci.org/calmm-js/karet-shopping-cart) [![](https://david-dm.org/calmm-js/karet-shopping-cart.svg)](https://david-dm.org/calmm-js/karet-shopping-cart) [![](https://david-dm.org/calmm-js/karet-shopping-cart/dev-status.svg)](https://david-dm.org/calmm-js/karet-shopping-cart?type=dev)

Prebuilt site: [Shopping Cart](http://calmm-js.github.io/karet-shopping-cart/)

Editable version with WebpackBin: [Shopping Cart](https://www.webpackbin.com/bins/-Ket7sKPrn4_p_BSwJug)

To try locally:

```bash
git clone https://github.com/calmm-js/karet-shopping-cart.git
cd karet-shopping-cart
npm install
```

Then `open docs/index.html` file in your browser.

If you want to edit the code, you can also run `npm run watch` to auto build
when sources are changed.  You will need to manually refresh the browser.

## Tutorial

Here is how to write the very beginnings of a Shopping Cart UI using
* [atoms](https://github.com/calmm-js/kefir.atom), and
* [lenses](https://github.com/calmm-js/partial.lenses), with
* the [`karet`](https://github.com/calmm-js/karet) and via
* the [`karet.util`](https://github.com/calmm-js/karet.util) libraries.

Karet is simple library that allows one to embed Kefir observables
into [React](https://facebook.github.io/react/) VDOM.  If this tutorial advances
at a too fast a pace, then you might want to read a
longer
[introduction](https://github.com/calmm-js/documentation/blob/master/introduction-to-calmm.md) to
the approach.

### Counters are not toys!

So, how does one create a Shopping Cart UI?

Well, *of course*, the first thing is to write the classic counter component:

```jsx
const Counter = ({count}) =>
  <span>
    <button onClick={() => count.modify(R.add(-1))}>-</button>
    {count}
    <button onClick={() => count.modify(R.add(+1))}>+</button>
  </span>
```

The `Counter` component displays a `count`, which is supposed to refer to state
that contains an integer, and buttons labeled `-` and `+` that decrement and
increment the `count` using [`modify`](#modify).

As you probably know, a counter component such as the above is a typical first
example that the documentation of any respectable front-end framework will give
you.  Until now you may have *mistakenly* thought that those are just toys.

### Component, remove thyself!

The next thing is to write a component that can remove itself:

```jsx
const Remove = ({removable}) =>
  <button onClick={() => removable.remove()}>x</button>
```

The `Remove` component gives you a button labeled `x` that
calls [`remove`](#remove) on the `removable` state given to it.

### Lists are simple data structures

Then we write a higher-order component that can display a list of items:

```jsx
const Items = ({items, Item}) =>
  <div>
    {U.seq(items, U.indices, U.mapCached(i =>
           <Item key={i} item={U.view(i, items)}/>))}
  </div>
```

The `Items` component is given state named `items` that is supposed to refer to
an array of objects.  From that array it then produces an unordered list of
`Item` components, passing them an `item` that corresponds to an element of the
`items` state array.

### Items in a cart

We haven't actually written anything shopping cart specific yet.  Let's change
that by writing a component for cart items:

```jsx
const cartName = U.view("name")

const cartCount =
  U.view([L.choose((props = {}) => L.defaults({...props, count: 0})),
          "count"])

const CartItem = ({item}) =>
  <div>
    <Remove removable={item}/>
    <Counter count={cartCount(item)}/>
    {cartName(item)}
  </div>
```

The `CartItem` component is designed to work as `Item` for the previous `Items`
component.  It is a simple component that is given state named `item` that is
supposed to refer to an object containing `name` and `count` fields.  `CartItem`
uses the previously defined `Remove` and `Counter` components.  The `Remove`
component is simply passed the `item` as the `removable`.  The `Counter`
component is given
a [lensed](https://github.com/calmm-js/partial.lenses) [view](#view) of the
`count`.  The `cartCount` lens makes it so that when the `count` property
reaches `0` the whole item is removed.

**_This is important:_** By using a simple lens as an adapter, we
could
[plug](https://github.com/calmm-js/documentation/blob/master/introduction-to-calmm.md#imagine) the
previously defined `Counter` component into the shopping cart state.

If this is the first time you
encounter [partial lenses](https://github.com/calmm-js/partial.lenses), then the
definition of `cartCount` may be difficult to understand, but it is not very
complex at all.  It works like this.  It looks at the incoming object and grabs
all the properties as `props`.  It then uses those to return a lens that, when
written through, will replace an object of the form `{...props, count: 0}` with
`undefined`.  This way, when the `count` reaches `0`, the whole item gets
removed.  After working with partial lenses for some time you will be able to
write far more interesting lenses.

### Items to put into the cart

We are nearly done!  We just need one more component for products:

```jsx
const productName = U.view("name")

const productCount = U.staged(item =>
  U.view([L.find(R.whereEq({id: item.id})),
          L.defaults(item),
          "count",
          L.defaults(0),
          L.normalize(R.max(0))]))

const ProductItem = cart => ({item}) =>
  <div>
    {K(item, item => <Counter count={productCount(item, cart)}/>)}
    {productName(item)}
  </div>
```

The `ProductItem` component is also designed to work as an `Item` for the
previous `Items` component.  Note that `ProductItem` actually takes two curried
arguments.  The first argument `cart` is supposed to refer to cart state.
`ProductItem` also reuses the `Counter` component.  This time we give it another
non-trivial lens.  The `productCount` lens is a parameterized lens that is given
an `item` to put into the `cart`.

### Putting it all together

We now have all the components to put together our shopping cart application.
Here is a list of some Finnish delicacies:

```jsx
const products = [
  {id: 1, name: "Sinertävä lenkki 500g"},
  {id: 2, name: "Maksainen laatikko 400g"},
  {id: 3, name: "Maitoa etäisesti muistuttava juoma 0.9l"},
  {id: 4, name: "Festi moka kaffe 500g"},
  {id: 5, name: "Niin hyvä voffeli ettei saa 55g"},
  {id: 6, name: "Suklainen Japanilainen viihdyttäjä 37g"}
]
```

And, finally, here is our `App`:

```jsx
const App = ({state, cart = U.view(["cart", L.define([])], state)}) =>
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
```

The `App` above lenses the `cart` state out of the whole app `state` and then
instantiates the components.  Note that we use the higher-order `Items`
component twice with different `Item` components and different lists of `items`.

### Summary

For the purposes of this example we are done.  Here is a summary:

* We wrote several components such as `Counter`, `Removable` and `Items` that
  are not specific to the application in any way.

* Each component is just one function that takes (possibly reactive variables
  as) parameters and returns VDOM.

* We composed components together as VDOM expressions.

* We used `Counter` and `Items` twice in different contexts.

* When using `Counter` we used lenses to decompose application specific state to
  match the interface of the component.
