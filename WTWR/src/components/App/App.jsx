import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import { useEffect, useState } from "react";
import { getWeather } from "../../utils/weatherAPI";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
  });

  const [location, setLocation] = useState(null);

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        setLocation(data.name);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="app">
      <div className="app__content">
        <Header location={location} />
        <Main />
        <Footer />
      </div>
    </div>
  );
}

export default App;
