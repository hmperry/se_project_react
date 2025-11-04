import WeatherCard from "../WeatherCard/WeatherCard.jsx";
import "./Main.css";
import ItemCard from "../ItemCard/ItemCard.jsx";

import MobileModal from "../MobileModal/MobileModal.jsx";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.jsx";

function Main({
  weatherData,
  handleCardClick,
  activeModal,
  handleMenuClick,
  closeActiveModal,
  clothingItems,
  onCardLike,
  // handleCardLike,
  currentUser,
}) {
  const temp = Math.round(weatherData.temp.F);

  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  return (
    <section className="main">
      <MobileModal
        activeModal={activeModal}
        handleMenuClick={handleMenuClick}
        closeActiveModal={closeActiveModal}
      />
      {activeModal !== "profile-menu" && (
        <WeatherCard weatherData={weatherData} />
      )}
      <h1 className="main__heading">
        Today is {weatherData.temp[currentTemperatureUnit]}
        &deg; {currentTemperatureUnit} / Your may want to wear:
      </h1>
      <ul className="cards__list">
        {clothingItems
          .filter((item) => {
            return item.weather === weatherData.type;
          })
          .map((item) => {
            return (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={handleCardClick}
                onCardLike={onCardLike}
                isLiked={item.likes.includes(currentUser._id)}
              />
            );
          })}
      </ul>
    </section>
  );
}

export default Main;
