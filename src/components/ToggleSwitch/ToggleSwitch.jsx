import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import "./ToggleSwitch.css";
import { useContext } from "react";

function ToggleSwitch() {
  const { handleToggleSwitchChange, currentTemperatureUnit } = useContext(
    CurrentTemperatureUnitContext
  );

  return (
    <label htmlFor="temp_system" className="toggle__label">
      <input
        onChange={handleToggleSwitchChange}
        type="checkbox"
        className="toggle__checkbox"
        id="temp_system"
      />

      <span
        className={`toggle__text ${
          currentTemperatureUnit === "F" ? "toggle__selectF" : ""
        }`}
      >
        F
      </span>
      <span
        className={`toggle__text ${
          currentTemperatureUnit === "C" ? "toggle__selectC" : ""
        }`}
      >
        C
      </span>
      <span className="toggle__btn" />
    </label>
  );
}

export default ToggleSwitch;
