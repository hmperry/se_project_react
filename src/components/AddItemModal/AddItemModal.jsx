import "./addItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect, useState, createContext } from "react";

function AddItemModal({ isOpen, closeActiveModal, onAddItemModalSubmit }) {
  const [garmentName, setGarmentName] = useState("");
  const [garmentUrl, setGarmentUrl] = useState("");
  const [weatherType, setWeatherType] = useState("");

  const handleNameChange = (e) => {
    setGarmentName(e.target.value);
  };

  const handleUrlChange = (e) => {
    setGarmentUrl(e.target.value);
  };

  const handleWeatherTypeChange = (e) => {
    setWeatherType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onAddItemModalSubmit({ garmentName, garmentUrl, weatherType });

    //empty inputs
    setGarmentName("");
    setGarmentUrl("");
    setWeatherType("");
  };

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add Garment"
      isOpen={isOpen}
      closeActiveModal={closeActiveModal}
      onSubmit={handleSubmit}
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
          value={garmentName}
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
          value={garmentUrl}
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
            checked={weatherType === "hot"}
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
            checked={weatherType === "warm"}
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
            checked={weatherType === "cold"}
          />
          <span className="radio__option">Cold</span>
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
