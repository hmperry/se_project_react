import "./WeatherCard.css";
import { weatherOptions } from "../../../utils/constants";

function WeatherCard({ weatherData, temp }) {
  const filteredOptions = weatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  const weatherOptionUrl = filteredOptions[0]?.url;
  const weatherOptionCondition = filteredOptions[0]?.condition;

  console.log("filteredOptions:", filteredOptions);
  console.log("weatherData:", weatherData);

  return (
    <div className="weatherCard">
      <div className="weatherCard__content">{temp}&deg; F</div>
      <img
        src={weatherOptionUrl}
        alt={weatherOptionCondition}
        className="weatherCard__image"
      />
    </div>
  );
}

export default WeatherCard;
