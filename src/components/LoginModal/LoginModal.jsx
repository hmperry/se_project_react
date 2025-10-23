import "./LoginModal.css";
import "../ModalWithForm/ModalWithForm.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect, useState, createContext } from "react";

function LoginModal({ isOpen, closeActiveModal, onLoginSubmit, switchModal }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onLoginSubmit({ password, email }).then(() => {
      setEmail("");
      setPassword("");
    });
  };

  return (
    <ModalWithForm
      title="Log In"
      buttonText="Log In"
      isOpen={isOpen}
      closeActiveModal={closeActiveModal}
      onSubmit={handleSubmit}
      buttonText2="or Sign Up"
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
    </ModalWithForm>
  );
}

export default LoginModal;
