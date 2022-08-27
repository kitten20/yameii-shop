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
    cartPrice: 0,

    setCart: (i) => set((state) => ({
        cart: [i, ...state.cart]
    })),

    deleteItem: (i) => set((state) => ({
        cart: state.cart.filter(f => f !== i)
    })),
})

export const useProductsStore = create(productsStore)
export const useCartStore = create(persist(cartStore, {
    name: "cart"
}))