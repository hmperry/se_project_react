import WeatherCard from "./WeatherCard/WeatherCard";
import "./Main.css";
import ItemCard from "./ItemCard/ItemCard";

function Main() {
  return (
    <section className="main">
      <div className="main__content">
        <WeatherCard />
        <ItemCard />
      </div>
    </section>
  );
}

export default Main;
