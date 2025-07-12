import "./WeatherCard.css";
import { weatherOptions, defaultWeatherOptions } from "../../utils/constants";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const filteredOptions = weatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  let weatherOption;

  if (filteredOptions.length === 0) {
    weatherOption = defaultWeatherOptions[weatherData.isDay ? "day" : "night"];
  } else {
    weatherOption = filteredOptions[0];
  }

  return (
    <div className="weatherCard">
      <div className="weatherCard__content">
        {weatherData.temp[currentTemperatureUnit]}
        &deg; {currentTemperatureUnit}
      </div>
      <img
        src={weatherOption?.url}
        alt={weatherOption?.condition}
        className="weatherCard__image"
      />
    </div>
  );
}

export default WeatherCard;
