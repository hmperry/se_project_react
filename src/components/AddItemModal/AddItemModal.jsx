import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect, useState, createContext } from "react";

function AddItemModal({ isOpen, closeActiveModal, onAddItemModalSubmit }) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");

  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState({});

  const validateNewGarment = (name, imageUrl, weather) => {
    const newErrors = {};
    let formIsValid = true;

    // Name validation
    if (!name.trim()) {
      newErrors.name = "Name is required";
      formIsValid = false;
    }

    // Image URL validation
    if (!imageUrl || imageUrl.trim() === "") {
      newErrors.imageUrl = "Please provide an image URL";
      formIsValid = false;
    } else {
      // URL format validation
      const urlRegex = /^https?:\/\/.+/;
      if (!urlRegex.test(imageUrl)) {
        newErrors.imageUrl =
          "Please enter a valid URL starting with http:// or https://";
        formIsValid = false;
      }
    }

    // Weather type validation
    if (!weather || weather.trim() === "") {
      newErrors.weather = "Please select a weather type";
      formIsValid = false;
    } else if (!["hot", "warm", "cold"].includes(weather)) {
      newErrors.weather = "Please select a valid weather type";
      formIsValid = false;
    }

    setErrors(newErrors);
    setIsValid(formIsValid);
    return formIsValid;
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    validateNewGarment(e.target.value, imageUrl, weather);
  };

  const handleUrlChange = (e) => {
    setImageUrl(e.target.value);
    validateNewGarment(name, e.target.value, weather);
  };

  const handleWeatherTypeChange = (e) => {
    setWeather(e.target.value);
    validateNewGarment(name, imageUrl, e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onAddItemModalSubmit({ name, imageUrl, weather }).then(() => {
      setName("");
      setImageUrl("");
      setWeather("");
    });

    //empty inputs
    // setName("");
    // setImageUrl("");
    // setWeather("");
  };

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add Garment"
      isOpen={isOpen}
      closeActiveModal={closeActiveModal}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <label htmlFor="name" className="modal__label">
        Name
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
      <label htmlFor="imageURL" className="modal__label">
        Image
        <input
          type="url"
          className="modal__input"
          id="imageURL"
          placeholder="Image URL"
          required
          onChange={handleUrlChange}
          value={imageUrl}
        />
      </label>
      <fieldset className="modal__radioButtons">
        <legend className="modal__legend">Select the weather type:</legend>

        <label className="modal__radio-label" htmlFor="hot">
          <input
            className="modal__radio-input"
            type="radio"
            id="hot"
            name="garment"
            value="hot"
            onChange={handleWeatherTypeChange}
            checked={weather === "hot"}
          />
          <span className="radio__option">Hot</span>
        </label>

        <label className="modal__radio-label" htmlFor="warm">
          <input
            className="modal__radio-input"
            type="radio"
            id="warm"
            name="garment"
            value="warm"
            onChange={handleWeatherTypeChange}
            checked={weather === "warm"}
          />
          <span className="radio__option">Warm</span>
        </label>
        <label className="modal__radio-label" htmlFor="cold">
          <input
            className="modal__radio-input"
            type="radio"
            id="cold"
            name="garment"
            value="cold"
            onChange={handleWeatherTypeChange}
            checked={weather === "cold"}
          />
          <span className="radio__option">Cold</span>
        </label>

        {errors.weather && (
          <span className="modal__error">{errors.weather}</span>
        )}
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
