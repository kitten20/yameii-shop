import { useState, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';

import module from './style.module.scss'

import minus from '../../../assets/Cart/minus.png'
import plus from '../../../assets/Cart/plus.png'
import cross from '../../../assets/Cart/cross.svg'

function CartItem({ cart, item, deleteItem, setCart }) {
    const title = item.title,
        image = item.image,
        amount = item.amount,
        price = item.price;

    const upperRef = useRef("")
    const [amountState, setAmountState] = useState(amount)

    const sumPrice = price * amount
    const openUpper = () => upperRef.current.classList.toggle(module["cart-item-upper_active"])

    const setItem = (a) => {
        let indexItem = cart.indexOf(item)
        cart.splice(indexItem, 1)
        return setCart({
            id: item.id,
            title,
            image,
            price,
            amount: a
        })
    }

    useMemo(() => setAmountState(amountState), [amountState])

    return (
        <div className={module.cart__item}>
            <div className={module["cart-item__row"]}>
                <div className={module["cart-item__column"]}>
                    <h1>{title}</h1>

                    <div className={module["cart-item__amount"]}>
                        <div>
                            <button onClick={() => setAmountState(amountState + 1)}>
                                <img src={plus} alt="" />
                            </button>

                            <p>{amountState}</p>

                            {amountState > 1 ? (
                                <button onClick={() => setAmountState(amountState - 1)}>
                                    <img src={minus} alt="" />
                                </button>
                            ) : (
                                <button style={{ backgroundColor: "rgb(216 146 179)" }} onClick={openUpper}>
                                    <img src={minus} alt="" />
                                </button>
                            )}
                        </div>

                        {
                            amountState !== amount
                                ?
                                <button className={module["save-changes"]} onClick={() => setItem(amountState)}>
                                    Сохранить изменение
                                </button>
                                :
                                ""
                        }
                    </div>

                    <h1>{price}₽/шт.</h1>

                </div>

                <div className={module["cart-item__column"]}>
                    <img src={image} alt="" />
                    <button onClick={openUpper}>
                        <img src={cross} alt="" />
                    </button>
                </div>
            </div>

            <div className={module["cart-item__row"]}>
                <p>Товаров добавлено на сумму: {sumPrice}₽</p>
            </div>

            <div className={module["cart-item__row"]}>
                <Link to={"/item/" + item.id}>Перейти на товар</Link>
            </div>

            <div className={module["cart-item-upper"]} ref={upperRef}>
                <h1>Вы действительно хотите удалить предмет?</h1>

                <div>
                    <button onClick={() => deleteItem()}>Удалить</button>
                    <button onClick={openUpper}>Оставить</button>
                </div>
            </div>
        </div >
    );
}

export default CartItem;