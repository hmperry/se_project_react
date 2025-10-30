import "./EditProfileModal.css";
import "../ModalWithForm/ModalWithForm.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect, useState, createContext, useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function EditProfileModal({
  isOpen,
  closeActiveModal,
  onEditProfileSubmit,
  switchModal,
}) {
  const { currentUser, handleSignOut, handleEditProfileClick } =
    useContext(CurrentUserContext);
  if (!currentUser) {
    return <div>Loading...</div>;
  }

  const [name, setName] = useState(currentUser.name);
  const [avatarUrl, setAvatarUrl] = useState(currentUser.avatarUrl);

  const handleAvatarUrlChange = (e) => {
    setAvatarUrl(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onEditProfileSubmit({ name, avatarUrl }).then(() => {
      setName(currentUser.name);
      setAvatarUrl(currentUser.avatarUrl);
    });
  };

  useEffect(() => {
    setName(currentUser.name);
    setAvatarUrl(currentUser.avatarUrl);
  }, [currentUser]);

  return (
    <ModalWithForm
      title="Edit Profile"
      buttonText="Save changes"
      buttonText2="Cancel"
      isOpen={isOpen}
      closeActiveModal={closeActiveModal}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name*
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="name"
          required
          onChange={handleNameChange}
          value={name}
        />
      </label>

      <label htmlFor="avatarURL" className="modal__label">
        Avatar URL*
        <input
          type="url"
          className="modal__input"
          id="avatarURL"
          placeholder="avatar URL"
          required
          onChange={handleAvatarUrlChange}
          value={avatarUrl}
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
