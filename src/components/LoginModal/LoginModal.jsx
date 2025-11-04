import "./LoginModal.css";
import "../ModalWithForm/ModalWithForm.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect, useState, createContext } from "react";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function LoginModal({ isOpen, closeActiveModal, onLoginSubmit, switchModal }) {
  const currentUser = useContext(CurrentUserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState({});

  const validateLogin = (email, password) => {
    const newErrors = {};
    let formIsValid = true;

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
    } else if (password.length < 3) {
      newErrors.password = "Password must be at least 6 characters";
      formIsValid = false;
    }

    setErrors(newErrors);
    setIsValid(formIsValid);
    return formIsValid;
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    validateLogin(email, e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    validateLogin(e.target.value, password);
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
      isValid={isValid}
    >
      <label htmlFor="login-email" className="modal__label">
        Email*
        <input
          type="email"
          className="modal__input"
          id="login-email"
          placeholder="Email"
          required
          onChange={handleEmailChange}
          value={email}
        />
      </label>

      <label htmlFor="login-password" className="modal__label">
        Password*
        <input
          type="password"
          className="modal__input"
          id="login-password"
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
