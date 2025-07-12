import "../ConfirmationModal/ConfirmationModal.css";
import "../ModalWithForm/ModalWithForm";
import "../ItemModal/ItemModal.css";

function ConfirmationModal({ activeModal, isOpen, closeActiveModal }) {
  return (
    <div className={`confirmation ${isOpen ? "modal__open" : ""}`}>
      <div className="confirmation__preview">
        <p className="confirmation__text">
          Are you sure you want to delete this item?
        </p>
        <p className="confirmation__text">This action is irreversible.</p>
        <button className="confirmation__delete-btn">Yes, delete item</button>
        <button className="confirmation__cancel-btn">Cancel</button>
      </div>
    </div>
  );
}

export default ConfirmationModal;
