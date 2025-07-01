import "../ModalWithForm/ModalWithForm";
import "../ItemModal/itemModal.css";

function ItemModal({ activeModal, selectedCard, closeActiveModal }) {
  return (
    <div className={`modal ${activeModal === "preview" ? "modal__open" : ""}`}>
      <div className="itemModal__preview">
        <button
          onClick={closeActiveModal}
          type="button"
          className="modal__close modal__close-preview"
        ></button>
        <img src={selectedCard.link} alt="" className="modal__img" />
        <div className="modal__footer">
          <h2 className="modal__caption">{selectedCard.name}</h2>
          <p className="modal__weather">Weather: {selectedCard.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
