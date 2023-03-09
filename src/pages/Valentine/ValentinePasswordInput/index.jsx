import { useState, useRef } from "react";

import module from "./style.module.scss";

function PasswordInput({
  passwordBoolean,
  setPasswordInputBoolean = () => {},
}) {
  const [buttonText, setButtonText] = useState("подтвердить");

  const inputRef = useRef(null);
  const backgroundRef = useRef(null);
  const formRef = useRef(null);

  const valentinePassword = process.env.REACT_APP_VALENTINEPASSWORD;

  const checkActive = (i) => (i ? " " + module.active : "");
  const checkText = () => {
    setButtonText("Пароль неправильный");
    setTimeout(() => setButtonText("подтвердить"), 1500);
  };
  const setElementsDestroy = () => {
    setPasswordInputBoolean(false);
    setTimeout(() => {
      backgroundRef.current.classList.add(module.destroyed);
      formRef.current.classList.add(module.destroyed);
    }, 1500);
  };
  const checkInput = () =>
    inputRef.current.value === valentinePassword
      ? setElementsDestroy()
      : checkText();

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          checkInput();
        }}
        className={module["valentine-form"] + checkActive(passwordBoolean)}
        ref={formRef}
      >
        <h4>Какой пароль в открытке?</h4>
        <input type="text" ref={inputRef} />
        <button disabled={buttonText !== "подтвердить"}>{buttonText}</button>
      </form>

      <div
        className={
          module["valentine-background"] + checkActive(passwordBoolean)
        }
        ref={backgroundRef}
      ></div>
    </>
  );
}

export default PasswordInput;
