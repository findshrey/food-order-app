import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Header from './components/Header'
import Menu from './components/Menu/Menu'
import MenuCategory from './components/MenuCategory/MenuCategory'
import Cart from './components/Cart/Cart'
import NotFound from './components/NotFound'

function App() {
  return (
    <>
      <Header />
      <main>
        <BrowserRouter>
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
        </BrowserRouter>
      </main>
    </>
  );
}

export default App