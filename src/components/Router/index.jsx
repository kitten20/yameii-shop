import { Routes, Route } from 'react-router-dom'

import Main from '../../pages/Main'
import About from '../../pages/About'

function Router() {
    return ( 
        <Routes>
            <Route element={<Main/>} path="/"/>
            <Route element={<About/>} path="/about"/>
        </Routes>
     );
}

export default Router;