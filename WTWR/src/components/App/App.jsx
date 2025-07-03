import { useEffect, useState } from "react";

import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";

import { getWeather, filterWeatherData } from "../../utils/weatherAPI";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleMenuClick = () => {
    setActiveModal("profile-menu");
    console.log("Works?");
  };

  const closeActiveModal = () => {
    setActiveModal("");
    console.log("Yes?");
  };

  const [location, setLocation] = useState(null);

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredWeatherData = filterWeatherData(data);
        setWeatherData(filteredWeatherData);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="app">
      <div className="app__content">
        <Header
          weatherData={weatherData}
          handleAddClick={handleAddClick}
          handleMenuClick={handleMenuClick}
        />
        <Main
          weatherData={weatherData}
          handleCardClick={handleCardClick}
          handleMenuClick={handleMenuClick}
          activeModal={activeModal}
          closeActiveModal={closeActiveModal}
        />
        <Footer />
      </div>
      <ModalWithForm
        title="New garment"
        buttonText="Add Garment"
        activeModal={activeModal}
        closeActiveModal={closeActiveModal}
      >
        <label htmlFor="name" className="modal__label">
          Name
          <input
            type="text"
            className="modal__input"
            id="name"
            placeholder="Name"
          />
        </label>
        <label htmlFor="imageURL" className="modal__label">
          Image
          <input
            type="url"
            className="modal__input"
            id="imageURL"
            placeholder="Image URL"
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
            />
            <span className="radio__option">Hot</span>
          </label>

          <label className="modal__radio-label" htmlFor="warm">
            <input
              className="modal__radio-input"
              type="radio"
              id="warm"
              name="garment"
            />
            <span className="radio__option">Warm</span>
          </label>
          <label className="modal__radio-label" htmlFor="cold">
            <input
              className="modal__radio-input"
              type="radio"
              id="cold"
              name="garment"
            />
            <span className="radio__option">Cold</span>
          </label>
        </fieldset>
      </ModalWithForm>
      <ItemModal
        activeModal={activeModal}
        selectedCard={selectedCard}
        closeActiveModal={closeActiveModal}
      />
    </div>
  );
}

export default App;
