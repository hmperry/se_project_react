import "./WeatherCard.css";
import {
  weatherOptions,
  defaultWeatherOptions,
} from "../../../utils/constants";

function WeatherCard({ weatherData, temp }) {
  const filteredOptions = weatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  // const weatherOptionUrl = filteredOptions[0]?.url;
  // const weatherOptionCondition = filteredOptions[0]?.condition;

  let weatherOption;

  if (filteredOptions.length === 0) {
    weatherOption = defaultWeatherOptions[weatherData.isDay ? "day" : "night"];
  } else {
    weatherOption = filteredOptions[0];
  }

  return (
    <div className="weatherCard">
      <div className="weatherCard__content">{temp}&deg; F</div>
      <img
        src={weatherOption?.url}
        alt={weatherOption?.condition}
        className="weatherCard__image"
      />
    </div>
  );
}

export default WeatherCard;
