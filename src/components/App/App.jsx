import { useEffect, useState, createContext } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";

import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile.jsx";

import {
  getWeather,
  filterWeatherData,
  getLocation,
} from "../../utils/weatherAPI";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import ProtectedRoute from "../ProtectedRoute.jsx";

import AppContext from "../../contexts/AppContext.js";
import { setToken, getToken } from "../../utils/token.js";

// import { defaultClothingItems } from "../../utils/constants.js";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal.jsx";
import {
  addNewClothing,
  deleteClothing,
  getItems,
  addNewUser,
  authenticateUser,
  getUserInfo,
} from "../../utils/api.js";

function App() {
  const [userData, setUserData] = useState({ username: "", email: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [location, setLocation] = useState(null);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const openConfirmationModal = () => {
    setActiveModal("confirmation-delete");
  };

  const handleCardDelete = () => {
    deleteClothing(selectedCard._id)
      .then(() => {
        setClothingItems(
          clothingItems.filter((item) => item._id !== selectedCard._id)
        );
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Failed to delete:", error);
      });
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleMenuClick = () => {
    setActiveModal("profile-menu");
  };

  const handleRegistrationClick = () => {
    setActiveModal("register");
  };

  const handleLogInClick = () => {
    setActiveModal("login");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const switchModal = () => {
    if (activeModal === "login") {
      setActiveModal("register");
    }
    if (activeModal === "register") {
      setActiveModal("login");
    }
  };

  const handleRegisterSubmit = ({ name, avatarUrl, email, password }) => {
    return addNewUser({
      name,
      avatarUrl,
      email,
      password,
    })
      .then((data) => {
        console.log(data);
        setClothingItems([data, ...clothingItems]);

        //close modal
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Failed to save clothing", error);
      });
  };

  const handleLogInSubmit = async ({ email, password }) => {
    return authenticateUser({
      email,
      password,
    })
      .then(async (data) => {
        console.log(data);
        setToken(data.token);
        setIsLoggedIn(true);
        const currentUserData = await getUserInfo(data.token);
        setUserData(currentUserData);

        //close modal
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Failed to save clothing", error);
      });
  };

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    const token = getToken();
    return addNewClothing(
      {
        name,
        imageUrl,
        weather,
      },
      token
    )
      .then((data) => {
        console.log(data);
        setClothingItems([data, ...clothingItems]);

        //close modal
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Failed to save clothing", error);
      });
  };

  useEffect(() => {
    getLocation().then((coordinates) => {
      getWeather(coordinates, APIkey)
        .then((data) => {
          const filteredWeatherData = filterWeatherData(data);
          setWeatherData(filteredWeatherData);
        })
        .catch((error) => {
          console.error("Failed to fetch weather data:", error);
        });
    });
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  return (
    <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="app">
          <div className="app__content">
            <Header
              weatherData={weatherData}
              handleAddClick={handleAddClick}
              handleMenuClick={handleMenuClick}
              handleRegistrationClick={handleRegistrationClick}
              handleLogInClick={handleLogInClick}
              userData={userData}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    handleMenuClick={handleMenuClick}
                    activeModal={activeModal}
                    closeActiveModal={closeActiveModal}
                    clothingItems={clothingItems}
                  />
                }
              ></Route>
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      clothingItems={clothingItems}
                      handleCardClick={handleCardClick}
                      handleAddClick={handleAddClick}
                    />
                  </ProtectedRoute>
                }
              ></Route>
            </Routes>

            <Footer />
          </div>
          <AddItemModal
            isOpen={activeModal === "add-garment"}
            closeActiveModal={closeActiveModal}
            onAddItemModalSubmit={handleAddItemModalSubmit}
          />
          <ItemModal
            activeModal={activeModal}
            selectedCard={selectedCard}
            closeActiveModal={closeActiveModal}
            onDeleteClick={openConfirmationModal}
          />
          <ConfirmationModal
            onConfDeleteClick={handleCardDelete}
            isOpen={activeModal === "confirmation-delete"}
            closeActiveModal={closeActiveModal}
          />
          <RegisterModal
            onRegisterSubmit={handleRegisterSubmit}
            isOpen={activeModal === "register"}
            closeActiveModal={closeActiveModal}
            switchModal={switchModal}
          />
          <LoginModal
            onLoginSubmit={handleLogInSubmit}
            isOpen={activeModal === "login"}
            closeActiveModal={closeActiveModal}
            switchModal={switchModal}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
