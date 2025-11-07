import "../ModalWithForm/ModalWithForm";
import "../ItemModal/ItemModal.css";
import { useContext, useState } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({
  activeModal,
  selectedCard,
  closeActiveModal,
  onDeleteClick,
  isOpen,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  // Checking if the current user is the owner of the current clothing item
  const isOwn =
    currentUser && currentUser._id
      ? selectedCard.owner === currentUser._id
      : false;

  // Creating a variable which you'll then set in `className` for the delete button
  const itemDeleteButtonClassName = `modal__delete-button ${
    isOwn ? "" : "modal__delete-button_hidden"
  }`;

  return (
    <div
      onMouseDown={closeActiveModal}
      className={`modal ${activeModal === "preview" ? "modal__open" : ""}`}
    >
      <div
        className="itemModal__preview"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeActiveModal}
          type="button"
          className="modal__close modal__close-preview"
        ></button>
        <img
          src={selectedCard.imageUrl}
          alt={selectedCard.name}
          className="modal__img"
        />
        <div className="modal__footer">
          <h2 className="modal__caption">{selectedCard.name}</h2>
          <p className="modal__weather">Weather: {selectedCard.weather}</p>
          <button
            onClick={onDeleteClick}
            type="button"
            className={itemDeleteButtonClassName}
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
