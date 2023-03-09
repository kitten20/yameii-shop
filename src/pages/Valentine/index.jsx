import { useRef, useState } from "react";

import ValentineContainer from "./ValentineContainer";
import ValentinePasswordInput from "./ValentinePasswordInput";

import module from "./style.module.scss";

function Valentine() {
  const [passwordBoolean, setPasswordInputBoolean] = useState(true);
  const valentineContainerRef = useRef(null);

  return (
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
  );
}

export default Valentine;
