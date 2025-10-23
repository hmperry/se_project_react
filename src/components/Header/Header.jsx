import "./Header.css";
import { useContext } from "react";

import { Link } from "react-router-dom";
import logo from "../../assets/wtwrLogo.svg";
import avatar from "../../assets/placeholderAvatar.png";
import menu from "../../assets/hamburger_menu.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import AppContext from "../../contexts/AppContext";

function Header({
  weatherData,
  handleAddClick,
  handleMenuClick,
  handleRegistrationClick,
  handleLogInClick,
  userData,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const { isLoggedIn } = useContext(AppContext);

  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="What to Wear Logo" className="header__logo" />
      </Link>
      <div className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </div>
      <ToggleSwitch />
      {!isLoggedIn && (
        <div>
          <button
            onClick={handleRegistrationClick}
            type="button"
            className="header__add-clothes"
          >
            Sign Up
          </button>

          <button
            onClick={handleLogInClick}
            type="button"
            className="header__add-clothes"
          >
            Log In
          </button>
        </div>
      )}
      {isLoggedIn && (
        <div className="header__logged-in">
          <button
            onClick={handleAddClick}
            type="button"
            className="header__add-clothes"
          >
            + Add Clothes
          </button>
          <Link to="/profile" className="header__navlink">
            <div className="header__user-content">
              <li>{userData.name}</li>
              <img
                src={userData.avatarUrl}
                alt="User Avatar"
                className="header__avatar"
              />
            </div>
          </Link>
          <button
            className="header__menu"
            type="button"
            onClick={handleMenuClick}
          >
            <img
              src={menu}
              alt="WTWR or What to Wear logo"
              className="header__menu-icon"
            />
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
