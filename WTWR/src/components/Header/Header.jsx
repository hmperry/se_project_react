import "./Header.css";
import logo from "../../assets/wtwrLogo.svg";
import avatar from "../../assets/placeholderAvatar.png";

function Header({ weatherData, handleAddClick }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <img src={logo} alt="What to Wear Logo" className="header__logo" />
      <div className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </div>

      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes"
      >
        + Add Clothes
      </button>
      <div className="header__user-content">
        <li>Terrence Tegegne</li>
        <img src={avatar} alt="User Avatar" className="header__avatar" />
      </div>
    </header>
  );
}

export default Header;
