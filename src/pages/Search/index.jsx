import { useState, useRef } from 'react';
import { useOrdersStore, useDataOrdersStore } from '../../store'
import { Link } from 'react-router-dom'

import { Accordion, AccordionItem, AccordionItemHeading, AccordionItemButton, AccordionItemPanel, } from 'react-accessible-accordion';

import MainContainer from "../../components/MainContainer";

import module from './style.module.scss'

function Search() {
    const inputFindRef = useRef("")

    const orders = useOrdersStore(state => state.orders)
    const dataOrders = useDataOrdersStore(state => state.dataOrders)

    const [order, setOrder] = useState([])

    const findOrder = (e) => {
        e.preventDefault()

        setOrder([])

        const findDatabaseOrders = dataOrders.find(f => f.id === inputFindRef.current.value)
        const findDataOrders = orders.find(f => f.id === inputFindRef.current.value)

        if (findDatabaseOrders !== undefined) {
            setOrder(findDatabaseOrders)
        } else if (findDataOrders !== undefined) {
            setOrder(findDataOrders)
        }
    }

    return (
        <MainContainer className={module.search}>
            <h1 className={module["search-title"]}>Где мой товар?</h1>

            <form className={module["search-find-block"]} onSubmit={e => findOrder(e)}>
                <input
                    type="text"
                    placeholder="Введите сюда код, данный на странице с оформлением"
                    ref={inputFindRef}
                    required />
                <button>Проверить</button>
            </form>

            {order.items ? (
                <div className={module.search__block}>
                    <h2>Пробитый заказ:</h2>
                    <h3>ФИО - {order.name}</h3>
                    <h3>Город - {order.city}</h3>
                    <h3>Адрес - {order.street}, кв.{order.apartment}</h3>
                    <h3>На общую сумму в {order.sumPrice} рублей</h3>

                    {order.items.map(i => (
                        <div className={module.search__item} key={i.id}>
                            <div>
                                <Link to={i.id} key={i.id}>
                                    {i.title}
                                </Link>
                            </div>
                            <p> - </p>
                            <p>
                                {i.amount}шт.
                            </p>
                        </div>
                    ))}
                </div>
            ) : <h3>Ой, заказ не найден! Перепроверьте правильность написания кода</h3>}

            {orders.length > 0 ? (
                <Accordion className={module["search-accordion"]} allowZeroExpanded>
                    <h1 className={module["search-accordion-title"]}>Ваши заказанные товары:</h1>

                    {orders.map(i => (
                        <AccordionItem className={module["search-accordion__item"]} key={i.id}>
                            <AccordionItemHeading className={module["search-accordion__heading"]}>
                                <AccordionItemButton className={module["search-accordion__button"]}>
                                    {i.id}
                                </AccordionItemButton>
                            </AccordionItemHeading>
                            <AccordionItemPanel className={module["search-accordion__panel"]}>
                                <>
                                    <div>
                                        <h3>
                                            Статус доставки: <span className={module["search-accordion__status"]}>
                                                Застрял на таможне
                                            </span>;
                                        </h3>
                                        <h3>ФИО - {i.name};</h3>
                                        <h3>Адрес - г.{i.city}, ул.{i.street}, кв.{i.apartment};</h3>
                                        <h3>На общую сумму в {i.sumPrice} рублей;</h3>
                                    </div>

                                    <div className={module["search-accordion__products"]}>
                                        {i.items.map(oi => (
                                            <div key={oi.id} className={module["search-accordion__product"]}>
                                                <Link to={"/" + oi.id} key={oi.id}>
                                                    {oi.title}
                                                </Link>
                                                <p>-</p>
                                                <p>
                                                    {oi.amount}шт.
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            </AccordionItemPanel>
                        </AccordionItem>
                    ))}
                </Accordion>
            ) : <h1>Здесь высветятся Ваши заказанные продукты.</h1>}
        </MainContainer>
    );
}

export default Search;