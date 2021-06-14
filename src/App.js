import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Header from './components/Header'
import Menu from './components/Menu/Menu'
import MenuCategory from './components/MenuCategory/MenuCategory'
import Cart from './components/Cart/Cart'
import NotFound from './components/NotFound'
import { CartProvider } from './context/CartContext'

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Header />
        <main>
          <Switch>
            <Route path="/menu" exact>
              <Menu />
            </Route>
            <Route path="/menu/:category">
              <MenuCategory />
            </Route>
            <Route path="/cart">
              <Cart />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </main>
      </CartProvider>
    </BrowserRouter>
  )
}

export default App