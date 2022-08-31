import { useEffect } from 'react'

import { products, orders } from './firebase'
import { useProductsStore, useDataOrdersStore } from './store'

import Router from './components/Router'
import Nav from './components/Nav'

import './style.main.scss'

function App() {
  const setProducts = useProductsStore(state => state.setProducts)
  const setDataOrders = useDataOrdersStore(state => state.setDataOrders)

  // eslint-disable-next-line
  useEffect(() => { products.then(s => s.docs.forEach(i => setProducts(i.data()))); orders.then(s => s.docs.forEach(i => setDataOrders(i.data()))) }, [])

  return (
    <>
      <Nav />
      <Router />
    </>
  );
}

export default App;