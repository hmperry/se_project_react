import "../ConfirmationModal/ConfirmationModal.css";
import "../ModalWithForm/ModalWithForm";
import "../ItemModal/ItemModal.css";

function ConfirmationModal({ isOpen, closeActiveModal, onConfDeleteClick }) {
  return (
    <div className={`confirmation ${isOpen ? "confirmation__open" : ""}`}>
      <div className="confirmation__preview">
        <button
          onClick={closeActiveModal}
          type="button"
          className="confirmation__close"
        ></button>
        <p className="confirmation__text">
          Are you sure you want to delete this item?
        </p>
        <p className="confirmation__text">This action is irreversible.</p>
        <button
          className="confirmation__delete-btn"
          onClick={onConfDeleteClick}
          type="button"
        >
          Yes, delete item
        </button>
        <button
          className="confirmation__cancel-btn"
          onClick={closeActiveModal}
          type="button"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default ConfirmationModal;
