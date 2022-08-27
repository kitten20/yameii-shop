import { Link } from 'react-router-dom'
import { useProductsStore } from '../../../store'

import MainContainer from "../../../components/MainContainer";

import module from './style.module.scss'

function MainList() {
    const products = useProductsStore(state => state.products)

    return (
        <MainContainer className={module["list-container"]}>
            {products.map(i => (
                <Link key={i.id} className={module.list__item} to={"/item/" + i.id}>
                    <img src={i.image} alt="" />
                    <div className={module.list__row}>
                        <h1>{i.title}</h1>
                        <button>
                            Перейти к товару
                        </button>
                    </div>
                </Link>
            ))}
        </MainContainer>
    );
}

export default MainList;