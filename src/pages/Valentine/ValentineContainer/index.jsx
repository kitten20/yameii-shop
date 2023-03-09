import { useState, useRef } from "react";

import letterSvg from "./assets/letter.svg";

import module from "./style.module.scss";

function ValentineTextContainer({ letterChecked = false }) {
  const checkActive = () => (letterChecked ? " " + module.active : "");

  const valentineTitle = process.env.REACT_APP_VALENTINETITLE;
  const valentineText = process.env.REACT_APP_VALENTINETEXT;

  return (
    <div className={module["valentine-text-container"] + checkActive()}>
      <div className={module["valentine-text-content"]}>
        <h2>{valentineTitle}</h2>
        <p>{valentineText}</p>
      </div>
    </div>
  );
}

function ValentineContainer() {
  const [letterChecked, setLetterChecked] = useState(false);
  const letterRef = useRef(null);

  const buttonCheck = () => {
    letterRef.current.classList.add(module.active);
    setTimeout(() => {
      setLetterChecked(true);
    }, 350);
  };

  return (
    <div>
      <div className={module["valentine-letter-container"]}>
        <button onClick={buttonCheck} ref={letterRef}>
          <img src={letterSvg} alt="" />
        </button>
        <h3>
          Нажми на меня!
          <br />
          Здесь что-то интересное..)
        </h3>
      </div>

      <ValentineTextContainer {...{ letterChecked }} />
    </div>
  );
}

export default ValentineContainer;
