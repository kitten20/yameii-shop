import { Routes, Route } from 'react-router-dom'

import Main from '../../pages/Main'
import About from '../../pages/About'
import Item from '../../pages/Item'
import Cart from '../../pages/Cart'
import Search from '../../pages/Search'

function Router() {
    return (
        <Routes>
            <Route element={<Main />} path="/" />
            <Route element={<About />} path="/about" />
            <Route element={<Item />} path="/item/:id" />
            <Route element={<Cart />} path="/cart" />
            <Route element={<Search />} path="/where-is-my-order" />
        </Routes>
    );
}

export default Router;