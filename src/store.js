import create from "zustand";

import {
    persist
} from 'zustand/middleware'

const productsStore = (set) => ({
    products: [],

    setProducts: (i) => set((state) => ({
        products: [...state.products, i]
    })),
})

const cartStore = (set) => ({
    cart: [],

    setCart: (i) => set((state) => ({
        cart: [i, ...state.cart]
    })),

    deleteItem: (i) => set((state) => ({
        cart: state.cart.filter(f => f !== i)
    })),

    clearCart: () => set(() => ({
        cart: []
    })),
})

const ordersStore = (set) => ({
    orders: [],

    setOrder: (i) => set((state) => ({
        orders: [i, ...state.orders]
    })),
})

const dataOrdersStore = (set) => ({
    dataOrders: [],

    setDataOrders: (i) => set((state) => ({
        dataOrders: [i, ...state.dataOrders]
    })),
})

export const useProductsStore = create(productsStore)
export const useDataOrdersStore = create(dataOrdersStore)
export const useOrdersStore = create(persist(ordersStore, {
    name: "orders"
}))
export const useCartStore = create(persist(cartStore, {
    name: "cart"
}))