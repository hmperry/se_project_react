import "../ModalWithForm/ModalWithForm.css";

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

          <button type="button" className="modal__link" onClick={switchModal}>
            {buttonText2}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ModalWithForm;
