import { useRef } from 'react';
import { NavLink, Link } from 'react-router-dom'

import module from './style.module.scss'
import cart from '../../assets/Nav/cart.png'

function Nav() {
    const burgerRef = useRef("")
    const navRef = useRef("")

    const burgerSetActive = () => {
        burgerRef.current.classList.toggle(module["nav-burger_active"])
        navRef.current.classList.toggle(module.nav_active)
    }

    return (
        <nav className={module.nav} ref={navRef}>
            <div className={module.nav__column}>
                <NavLink to="/">Yameii Shop</NavLink>

                <div className={module["nav-adaptive"]}>
                    <Link to="/about" className={module["nav-cart"]}>
                        <img src={cart} alt="" />
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
                <Link to="/about" className={module["nav-cart_pc"]}>
                    <img src={cart} alt="" />
                </Link>
            </div>
        </nav>
    );
}

export default Nav;