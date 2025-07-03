import WeatherCard from "../WeatherCard/WeatherCard.jsx";
import "./Main.css";
import ItemCard from "../ItemCard/ItemCard.jsx";
import { defaultClothingItems } from "../../utils/constants.js";
import MobileModal from "../MobileModal/MobileModal.jsx";

function Main({
  weatherData,
  handleCardClick,
  activeModal,
  handleMenuClick,
  closeActiveModal,
}) {
  const temp = Math.round(weatherData.temp.F);
  return (
    <section className="main">
      <MobileModal
        activeModal={activeModal}
        handleMenuClick={handleMenuClick}
        closeActiveModal={closeActiveModal}
      />
      {activeModal !== "profile-menu" && (
        <WeatherCard weatherData={weatherData} temp={temp} />
      )}
      <h1 className="main__heading">
        Today is {temp}&deg; F / Your may want to wear:
      </h1>
      <ul className="cards__list">
        {defaultClothingItems
          .filter((item) => {
            return item.weather === weatherData.type;
          })
          .map((item) => {
            return (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={handleCardClick}
              />
            );
          })}
      </ul>
    </section>
  );
}

export default Main;
