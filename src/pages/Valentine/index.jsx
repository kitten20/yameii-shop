import { useRef, useState } from "react";
import { Helmet } from "react-helmet";

import ValentineContainer from "./ValentineContainer";
import ValentinePasswordInput from "./ValentinePasswordInput";

import module from "./style.module.scss";

import heartIcon from './assets/heart-icon.png';

function Valentine() {
  const [passwordBoolean, setPasswordInputBoolean] = useState(true);
  const valentineContainerRef = useRef(null);

  return (
    <>
      <Helmet>
        <title>Это тебе, моя хорошая...</title>
        <link rel="icon" href={heartIcon}></link>
      </Helmet>

      <div className={module.valentine}>
        <div
          className={module["valentine-container"]}
          ref={valentineContainerRef}
          onLoad={() =>
            valentineContainerRef.current.classList.add(module.active)
          }
        >
          <ValentinePasswordInput
            {...{ passwordBoolean, setPasswordInputBoolean }}
          />
          <ValentineContainer />
        </div>
      </div>
    </>
  );
}

export default Valentine;
