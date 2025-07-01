import { useEffect, useState } from "react";

import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";

import { getWeather } from "../../utils/weatherAPI";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "hot",
    temp: { F: 999, C: 999 },
  });

  const [location, setLocation] = useState(null);

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        setLocation(data.name);
        setWeatherData({ ...weatherData, temp: data.main.temp });
      })
      .catch(console.error);
  }, []);

  return (
    <div className="app">
      <div className="app__content">
        <Header location={location} />
        <Main weatherData={weatherData} />
        <Footer />
      </div>
      <ModalWithForm title="New garment" buttonText="Add Garment">
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
      <ItemModal />
    </div>
  );
}

export default App;
