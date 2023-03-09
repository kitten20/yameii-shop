import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { products, orders } from "./firebase";
import { useProductsStore, useDataOrdersStore } from "./store";

import Router from "./components/Router";
import Nav from "./components/Nav";

import "./style.main.scss";

function App() {
  const location = useLocation();

  const setProducts = useProductsStore((state) => state.setProducts);
  const setDataOrders = useDataOrdersStore((state) => state.setDataOrders);

  // eslint-disable-next-line
  useEffect(() => {
    products.then((s) => s.docs.forEach((i) => setProducts(i.data())));
    orders.then((s) => s.docs.forEach((i) => setDataOrders(i.data())));
  }, []);

  return (
    <>
      {location.pathname !== "/v-09-03-2023-14-02" && <Nav />}
      <Router />
    </>
  );
}

export default App;
