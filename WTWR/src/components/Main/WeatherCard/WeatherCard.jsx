import "./WeatherCard.css";
import cloud from "../../../assets/cloud.svg";
import sun from "../../../assets/sun.svg";

function WeatherCard() {
  return (
    <div className="weatherCard">
      <div className="weatherCard__content">[44]</div>
      <img src={sun} alt="sun" className="weatherCard__content-sun" />
      <img src={cloud} alt="cloud" className="weatherCard__content-cloud" />
    </div>
  );
}

export default WeatherCard;
