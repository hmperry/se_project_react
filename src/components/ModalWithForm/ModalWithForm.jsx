import "../ModalWithForm/ModalWithForm.css";
import { useContext, useState, useRef, useEffect } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  closeActiveModal,
  onSubmit,
  buttonText2,
  switchModal,

  isValid = false,
}) {
  const { activeModal } = useContext(CurrentUserContext);

  const buttonClassName = `modal__submit ${
    isValid ? "modal__submit_enabled" : "modal__submit_disabled"
  }`;

  return (
    <div
      onMouseDown={closeActiveModal}
      className={`modal ${isOpen ? "modal__open" : ""}`}
    >
      <form
        onSubmit={onSubmit}
        className="modal__form"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={closeActiveModal}
          type="button"
          className="modal__close"
        />
        {children}
        <div className="modal__bottom">
          <button type="submit" className={buttonClassName} disabled={!isValid}>
            {buttonText}
          </button>

          {buttonText2 && (
            <button type="button" className="modal__link" onClick={switchModal}>
              {buttonText2}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default ModalWithForm;
