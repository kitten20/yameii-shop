import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { doc, setDoc, getFirestore } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid'
import moment from 'moment';

import { useCartStore, useOrdersStore } from '../../store'

import MainContainer from "../../components/MainContainer";
import CartItem from "./CartItem";

import module from './style.module.scss'

import cross from '../../assets/Cart/cross.svg'

function Cart() {
    const [itemCode, setItemCode] = useState("")
    const createRef = useRef("")
    const locationRef = useRef("")

    const nameRef = useRef("")
    const cityRef = useRef("")
    const streetRef = useRef("")
    const apartmentRef = useRef("")

    const cart = useCartStore(state => state.cart)
    const setCart = useCartStore(state => state.setCart)
    const deleteItem = useCartStore(state => state.deleteItem)
    const clearCart = useCartStore(state => state.clearCart)

    const setOrder = useOrdersStore(state => state.setOrder)

    const db = getFirestore()

    let cartPrice = 0,
        cartAmount = 0;

    cart.forEach(i => { cartPrice += (+(i.price) * (i.amount)); cartAmount += i.amount })

    const showCreatePopup = (e) => {
        e.preventDefault()
        createRef.current.classList.toggle(module["cart__popup_active"])
    }

    const createNewOrder = (e) => {
        e.preventDefault()

        let name = nameRef.current.value,
            city = cityRef.current.value,
            street = streetRef.current.value,
            apartment = apartmentRef.current.value,
            sumPrice = cartPrice,
            date = moment().format('LLL');

        const uid = uuidv4() + ""
        setItemCode(uid)

        const docObject = {
            id: uid,
            name,
            city,
            street,
            apartment,
            sumPrice,
            date,
            items: cart
        }

        setDoc(doc(db, "orders", uid), docObject);
        setOrder(docObject)

        showCreatePopup(e)
        createRef.current.reset()
        clearCart()

        locationRef.current.classList.toggle(module["cart__popup_active"])
    }

    return (
        <MainContainer className={module.cart}>
            <div className={module.cart__column}>
                {cart.length > 0
                    ?
                    cart.map(i => (
                        <CartItem
                            key={i.id}
                            deleteItem={() => deleteItem(i)}
                            setCart={setCart}
                            cart={cart}
                            item={i}
                        />
                    ))
                    :
                    (
                        <div className={module["cart-no-items"]}>
                            <h2>Похоже, что Вы не добавили ни одного предмета в корзину!</h2>
                            <Link to="/">Перейти на главную страницу</Link>
                        </div>
                    )
                }

                <form
                    className={module["cart__popup"]}
                    ref={createRef}
                    onSubmit={(e) => createNewOrder(e)}
                >
                    <button
                        className={module["cart-popup__button_close"]}
                        onClick={(e) => showCreatePopup(e)}
                    >
                        <img src={cross} alt="" />
                    </button>

                    <h1>
                        Оформить заказ
                    </h1>

                    <div className={module["cart-popup__input"]}>
                        <input
                            type="text"
                            required
                            placeholder='Ваше ФИО'
                            ref={nameRef}
                        />

                        <input
                            type="text"
                            required
                            placeholder='Ваш город'
                            ref={cityRef}
                        />

                        <input
                            type="text"
                            required
                            placeholder='Улица'
                            ref={streetRef}
                        />

                        <input
                            type="text"
                            required
                            placeholder='Квартира'
                            ref={apartmentRef}
                        />
                    </div>

                    <button>Оформить заказ</button>
                </form>

                <div
                    className={module["cart__popup"]}
                    ref={locationRef}
                >
                    <h1>Ваш код, по которому Вы можете отслеживать товар</h1>
                    <h2>{itemCode}</h2>
                    <p>Сохраните его, чтобы отслеживать перемещение товара на вкладке <Link to="/where-is-my-order">"Где Мой Товар"</Link></p>
                    <button onClick={() => locationRef.current.classList.toggle(module["cart__popup_active"])}>Закрыть</button>
                </div>
            </div>

            <div className={module.cart__column}>
                <h3><span>{cartAmount} предметов</span></h3>
                <h3>На общую сумму в <span>{cartPrice} рублей</span></h3>

                {cart.length > 0
                    ?
                    <button onClick={(e) => showCreatePopup(e)}>Оформить заказ</button>
                    :
                    <button style={{ backgroundColor: "rgb(216 146 179)" }}>Оформить заказ</button>
                }
            </div>
        </MainContainer>
    );
}

export default Cart;