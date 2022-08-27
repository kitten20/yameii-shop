import { useRef } from 'react';
import { NavLink, Link } from 'react-router-dom'

import { useCartStore } from '../../store'

import module from './style.module.scss'
import cart from '../../assets/Nav/cart.png'

function Nav() {
    const burgerRef = useRef("")
    const navRef = useRef("")
    const cartStore = useCartStore(state => state.cart)

    let cartStoreAmount = 0

    const burgerSetActive = () => {
        burgerRef.current.classList.toggle(module["nav-burger_active"])
        navRef.current.classList.toggle(module.nav_active)
    }

    cartStore.forEach(i => cartStoreAmount += i.amount)

    return (
        <nav className={module.nav} ref={navRef}>
            <div className={module.nav__column}>
                <NavLink to="/">Yameii Shop</NavLink>

                <div className={module["nav-adaptive"]}>
                    <Link to="/about" className={module["nav-cart"]}>
                        <img src={cart} alt="" />

                        <p>
                            {cartStoreAmount}
                        </p>
                    </Link>

                    <button className={module["nav-burger"]} ref={burgerRef} onClick={burgerSetActive}>
                        <div></div>
                        <div></div>
                        <div></div>
                    </button>
                </div>
            </div>

            <div className={module.nav__column}>
                <NavLink to="/">О нас</NavLink>
                <NavLink to="/">Где мой товар</NavLink>
                <Link to="/cart" className={module["nav-cart"] + " " + module["nav-cart_pc"]}>
                    <img src={cart} alt="" />

                    <p>
                        {cartStoreAmount}
                    </p>
                </Link>
            </div>
        </nav>
    );
}

export default Nav;