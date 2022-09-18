import { useEffect, useState } from "react";
import { Octokit } from 'octokit'

import MainContainer from "../../components/MainContainer";

import module from './style.module.scss'

function About() {
    const [lastCommitDate, setLastCommitDate] = useState([])

    useEffect(() => {
        const octokit = new Octokit({
            auth: process.env.REACT_APP_OCTOKEY
        })
        octokit.request('GET /repos/kitten20/yameii-shop/commits', {
            owner: 'kitten20',
            repo: 'yameii-shop',
            branch: 'main'
        }).then(i => setLastCommitDate(p => [...p, i.data]))
    }, [])

    return (
        <MainContainer className={module.about}>
            <div className={module.about__row}>
                <h1 className={module.about__title}>О проекте</h1>
                <h2>Идея возникла в честь Хайпер-поп,
                    Трэп исполнителя <a href="https://soundcloud.com/user-946342075">Yameii-Online</a>,
                    создатель благодарит за идею!
                </h2>
            </div>

            <div className={module.about__row}>
                <h1 className={module.about__title}>Идея</h1>
                <h2>Сама мысль была сделать Интернет-Магазин
                    без аутентификации, но с возможностью
                    добавлять в корзину, оформлять, покупать
                    и отслеживать товары. Для этого в проекте
                    был использован uid.js, позволяющий
                    генерировать случайный код,
                    очень похожий на трекер посылки.</h2>
            </div>

            <div className={module.about__row}>
                <h1 className={module.about__title}>Стэк проекта</h1>
                <h2>HTML5, CSS3 (SCSS), JavaScript (+uuid.js) React.js (+Zustand, SCSS-modules), Firebase.</h2>
            </div>

            <div className={module.about__row + " " + module["about__row_date"]}>
                <h1>Август-Сентябрь 2022</h1>
            </div>

            {lastCommitDate.length > 0 ? (
                <div className={module.about__row}>
                    <h1 className={module.about__title}>Лист коммитов с репозитория</h1>

                    <div className={module["about-container"]}>
                        {lastCommitDate[0].map(i => (
                            <div className={module.about__bugfix}>
                                <h1>{i.commit.message}</h1>
                                <p>{(i.commit.committer.date).replace('T', ' | ').replace('Z', '')}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ) : ""}
        </MainContainer>
    );
}

export default About;