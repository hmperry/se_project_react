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
  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState({});
  const [name, setName] = useState(currentUser.name);
  const [avatar, setAvatar] = useState(currentUser.avatar);

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  const validateEditForm = (avatar, name) => {
    const newErrors = {};
    let formIsValid = true;

    // Avatar URL validation
    if (!avatar || avatar.trim() === "") {
      newErrors.avatar = "Please provide an image URL";
      formIsValid = false;
    } else {
      // URL format validation
      const urlRegex = /^https?:\/\/.+/;
      if (!urlRegex.test(avatar)) {
        newErrors.avatar =
          "Please enter a valid URL starting with http:// or https://";
        formIsValid = false;
      }
    }

    // Name validation
    if (!name.trim()) {
      newErrors.name = "Name is required";
      formIsValid = false;
    }

    setErrors(newErrors);
    setIsValid(formIsValid);
    return formIsValid;
  };

  const handleAvatarUrlChange = (e) => {
    setAvatar(e.target.value);
    validateEditForm(e.target.value, name);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    validateEditForm(avatar, e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onEditProfileSubmit({ name, avatar }).then(() => {
      setName(currentUser.name);
      setAvatar(currentUser.avatar);
    });
  };

  useEffect(() => {
    setName(currentUser.name);
    setAvatar(currentUser.avatar);
  }, [isOpen]);

  return (
    <ModalWithForm
      title="Edit Profile"
      buttonText="Save changes"
      buttonText2="Cancel"
      isOpen={isOpen}
      closeActiveModal={closeActiveModal}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <label htmlFor="edit-name" className="modal__label">
        Name*
        <input
          type="text"
          className="modal__input"
          id="edit-name"
          placeholder="name"
          required
          onChange={handleNameChange}
          value={name}
        />
      </label>

      <label htmlFor="edit-avatar-URL" className="modal__label">
        Avatar URL*
        <input
          type="url"
          className="modal__input"
          id="edit-avatar-URL"
          placeholder="avatar URL"
          required
          onChange={handleAvatarUrlChange}
          value={avatar}
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
