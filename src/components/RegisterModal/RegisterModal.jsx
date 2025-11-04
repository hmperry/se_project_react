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
  const [avatar, setAvatar] = useState("");

  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = (name, email, password) => {
    const newErrors = {};
    let formIsValid = true;

    // Name validation
    if (!name.trim()) {
      newErrors.name = "Name is required";
      formIsValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = "Email is required";
      formIsValid = false;
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email";
      formIsValid = false;
    }

    // Password validation
    if (!password.trim()) {
      newErrors.password = "Password is required";
      formIsValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      formIsValid = false;
    }

    setErrors(newErrors);
    setIsValid(formIsValid);
    return formIsValid;
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    validateForm(name, email, e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    validateForm(name, e.target.value, password);
  };

  const handleAvatarUrlChange = (e) => {
    setAvatar(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    validateForm(e.target.value, email, password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onRegisterSubmit({ name, password, avatar, email }).then(() => {
      setName("");
      setAvatar("");
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
      isValid={isValid}
    >
      <label htmlFor="register-email" className="modal__label">
        Email*
        <input
          type="email"
          className="modal__input"
          id="register-email"
          placeholder="Email"
          required
          onChange={handleEmailChange}
          value={email}
        />
      </label>

      <label htmlFor="register-password" className="modal__label">
        Password*
        <input
          type="password"
          className="modal__input"
          id="register-password"
          placeholder="Password"
          required
          onChange={handlePasswordChange}
          value={password}
        />
      </label>

      <label htmlFor="register-name" className="modal__label">
        Name*
        <input
          type="text"
          className="modal__input"
          id="register-name"
          placeholder="Name"
          required
          onChange={handleNameChange}
          value={name}
        />
      </label>

      <label htmlFor="register-avatarURL" className="modal__label">
        Avatar URL*
        <input
          type="url"
          className="modal__input"
          id="register-avatarURL"
          placeholder="Avatar URL"
          required
          onChange={handleAvatarUrlChange}
          value={avatar}
        />
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;
