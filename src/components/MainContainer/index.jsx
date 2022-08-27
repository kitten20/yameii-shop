import module from './style.module.scss'

function MainContainer({ className, children }) {
    return (
        <div className={module["main-container"] + " " + className}>
            {children}
        </div>
    );
}

export default MainContainer;