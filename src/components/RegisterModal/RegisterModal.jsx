import "./RegisterModal.css";
import "../ModalWithForm/ModalWithForm.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect, useState, createContext } from "react";

function RegisterModal({
  isOpen,
  closeActiveModal,
  onRegisterSubmit,
  switchModal,
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleAvatarUrlChange = (e) => {
    setAvatarUrl(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onRegisterSubmit({ name, password, avatarUrl, email }).then(() => {
      setName("");
      setAvatarUrl("");
      setEmail("");
      setPassword("");
    });
  };

  return (
    <ModalWithForm
      title="Register"
      buttonText="Sign Up"
      buttonText2="or Log in"
      isOpen={isOpen}
      closeActiveModal={closeActiveModal}
      onSubmit={handleSubmit}
      switchModal={switchModal}
    >
      <label htmlFor="email" className="modal__label">
        Email*
        <input
          type="email"
          className="modal__input"
          id="email"
          placeholder="Email"
          required
          onChange={handleEmailChange}
          value={email}
        />
      </label>

      <label htmlFor="password" className="modal__label">
        Password*
        <input
          type="password"
          className="modal__input"
          id="password"
          placeholder="Password"
          required
          onChange={handlePasswordChange}
          value={password}
        />
      </label>

      <label htmlFor="name" className="modal__label">
        Name*
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
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
          placeholder="Avatar URL"
          required
          onChange={handleAvatarUrlChange}
          value={avatarUrl}
        />
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;
