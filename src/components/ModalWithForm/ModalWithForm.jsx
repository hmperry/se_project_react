import "../ModalWithForm/ModalWithForm.css";
import { useContext, useState } from "react";
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
}) {
  const { activeModal } = useContext(CurrentUserContext);
  return (
    <div className={`modal ${isOpen ? "modal__open" : ""}`}>
      <form onSubmit={onSubmit} className="modal__form">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={closeActiveModal}
          type="button"
          className="modal__close"
        />
        {children}
        <div className="modal__bottom">
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>

          <button
            type="button"
            className={
              activeModal === "EditProfile"
                ? "modal__link-hidden"
                : "modal__link"
            }
            onClick={switchModal}
          >
            {buttonText2}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ModalWithForm;
