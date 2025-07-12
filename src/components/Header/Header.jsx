import "./Header.css";
import { Link } from "react-router-dom";
import logo from "../../assets/wtwrLogo.svg";
import avatar from "../../assets/placeholderAvatar.png";
import menu from "../../assets/hamburger_menu.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function Header({ weatherData, handleAddClick, handleMenuClick }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="What to Wear Logo" className="header__logo" />
      </Link>
      <div className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </div>
      <ToggleSwitch />

      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes"
      >
        + Add Clothes
      </button>
      <Link to="/profile" className="header__navlink">
        <div className="header__user-content">
          <li>Terrence Tegegne</li>
          <img src={avatar} alt="User Avatar" className="header__avatar" />
        </div>
      </Link>
      <button className="header__menu" type="button" onClick={handleMenuClick}>
        <img
          src={menu}
          alt="WTWR or What to Wear logo"
          className="header__menu-icon"
        />
      </button>
    </header>
  );
}

export default Header;
