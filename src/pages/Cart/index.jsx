import { Link } from 'react-router-dom';
import { useCartStore } from '../../store'

import MainContainer from "../../components/MainContainer";
import CartItem from "./CartItem";

import module from './style.module.scss'

function Cart() {
    const cart = useCartStore(state => state.cart)
    const setCart = useCartStore(state => state.setCart)
    const deleteItem = useCartStore(state => state.deleteItem)

    let cartPrice = 0,
        cartAmount = 0;


    cart.forEach(i => { cartPrice += (+(i.price) * (i.amount)); cartAmount += i.amount })

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
            </div>

            <div className={module.cart__column}>

                <h3><span>{cartAmount} предметов</span></h3>
                <h3>На общую сумму в <span>{cartPrice} рублей</span></h3>

                <button>Оформить заказ</button>
            </div>
        </MainContainer>
    );
}

export default Cart;