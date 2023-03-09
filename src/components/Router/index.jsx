import { Routes, Route } from 'react-router-dom'

import Main from '../../pages/Main'
import About from '../../pages/About'
import Item from '../../pages/Item'
import Cart from '../../pages/Cart'
import Search from '../../pages/Search'
import Valentine from '../../pages/Valentine'

function Router() {
    return (
        <Routes>
            <Route element={<Main />} path="/" />
            <Route element={<About />} path="/about" />
            <Route element={<Item />} path="/item/:id" />
            <Route element={<Cart />} path="/cart" />
            <Route element={<Search />} path="/where-is-my-order" />
            <Route element={<Valentine />} path="/v-09-03-2023-14-02" />
        </Routes>
    );
}

export default Router;