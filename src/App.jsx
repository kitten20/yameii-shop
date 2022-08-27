import { useEffect } from 'react'

import { products } from './firebase'
import { useProductsStore } from './store'

import Router from './components/Router'
import Nav from './components/Nav'

import './style.main.scss'

function App() {
  const setProducts = useProductsStore(state => state.setProducts)

  useEffect(() => {
    products.then(s => s.docs.forEach(i =>
      setProducts(i.data())
    ))
    
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <Nav />
      <Router />
    </>
  );
}

export default App;