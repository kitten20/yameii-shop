import { useParams } from "react-router-dom";
import { useRef } from "react";
import { useProductsStore, useCartStore } from '../../store'

import MainContainer from "../../components/MainContainer";

import module from './style.module.scss'

function Item() {
    const params = useParams()
    const products = useProductsStore(state => state.products)

    const setCart = useCartStore(state => state.setCart)
    const cart = useCartStore(state => state.cart)

    const numberRef = useRef("")

    const findProduct = products.find(i => i.id === params.id)
    const findCart = cart.find(f => f.id === params.id)

    const setNewItem = (i) => {
        const sameItem = cart.find(f => f.id === i.id)
        const amountRef = +(numberRef.current.value)

        if (sameItem !== undefined) {
            const indexItem = cart.indexOf(sameItem)
            cart.splice(indexItem, 1)

            const lastAmount = +(sameItem.amount),
                amount = lastAmount + amountRef

            return setCart({
                id: i.id,
                title: i.title,
                image: i.image,
                price: i.price,
                amount
            })
        } else {
            return setCart({
                id: i.id,
                title: i.title,
                image: i.image,
                price: i.price,
                amount: amountRef
            })
        }
    }

    return (
        findProduct ? (
            <MainContainer className={module.card}>
                <div className={module.card__column}>
                    <img src={findProduct.image} alt="" />
                </div>

                <div className={module.card__column}>
                    <h1>{findProduct.title}</h1>
                    <p>{findProduct.description}</p>

                    <div>
                        <button onClick={() => setNewItem(findProduct)}>
                            Добавить в корзину
                        </button>

                        <input type="number" min="1" max="100" placeholder="1" ref={numberRef} />
                    </div>

                    {findCart
                        ?
                        <p>
                            Данных предметов в корзине: {findCart.amount}.
                        </p>
                        :
                        ""}
                    <div></div>
                </div>
            </MainContainer>
        ) : <div>Oops, something is not defined!</div>
    );
}

export default Item;