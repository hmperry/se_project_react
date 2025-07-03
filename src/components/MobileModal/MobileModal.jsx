import avatar from "../../assets/placeholderAvatar.png";
import "../ModalWithForm/ModalWithForm";
import "../MobileModal/MobileModal.css";

function MobileModal({
  activeModal,
  closeActiveModal,
  handleMenuClick,
  handleAddClick,
}) {
  return (
    <div
      className={`mobileModal ${
        activeModal === "profile-menu" ? "mobileModal__open" : ""
      }`}
    >
      <div className="mobileModal__popup">
        <button
          onClick={closeActiveModal}
          type="button"
          className="modal__close mobileModal__close"
        ></button>
        <div className="mobileModal__user-content">
          <li>Terrence Tegegne</li>
          <img src={avatar} alt="User Avatar" className="header__avatar" />
        </div>

        <button
          onClick={handleAddClick}
          type="button"
          className="mobileModal__add-clothes"
        >
          + Add Clothes
        </button>
      </div>
    </div>
  );
}

export default MobileModal;
