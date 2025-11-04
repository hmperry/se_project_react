import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import { setToken, getToken, removeToken } from "../../utils/token.js";

import "./App.css";
import { APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile.jsx";

import {
  getWeather,
  filterWeatherData,
  getLocation,
} from "../../utils/weatherAPI";
import ItemModal from "../ItemModal/ItemModal";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import ProtectedRoute from "../ProtectedRoute.jsx";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";

// import { defaultClothingItems } from "../../utils/constants.js";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal.jsx";
import * as api from "../../utils/api.js";

import * as auth from "../../utils/auth.js";

function App() {
  const [currentUser, setCurrentUser] = useState({ name: "", avatar: "" });
  // const [userData, setUserData] = useState({ username: "", email: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

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
  // const [isLiked, setIsLiked] = useState([]);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleLikeClick = (card) => {
    // setSelectedCard(card);
    if (isLiked.includes(card._id)) {
      setIsLiked(isLiked.filter((id) => id !== card._id));
    } else {
      setIsLiked((isLiked) => [...isLiked, card._id]);
    }
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    // Check if this card is not currently liked
    !isLiked
      ? // if so, send a request to add the user's id to the card's likes array
        api
          // the first argument is the card's id
          .addCardLike(id, token)
          .then((updatedCard) => {
            console.log("API Response:", updatedCard);
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard.data : item))
            );
          })
          .catch((err) => console.log(err))
      : // if not, send a request to remove the user's id from the card's likes array
        api
          // the first argument is the card's id
          .removeCardLike(id, token)
          .then((updatedCard) => {
            console.log("API Response:", updatedCard); // Add this line
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard.data : item))
            );
          })
          .catch((err) => console.log(err));
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const openConfirmationModal = () => {
    setActiveModal("confirmation-delete");
  };

  const handleCardDelete = () => {
    const token = getToken();
    return api
      .deleteClothing(selectedCard._id, token)
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

  const handleSignOut = () => {
    removeToken();
    setIsLoggedIn(false);
    setCurrentUser({ name: "", avatar: "" });
    navigate("/");
  };

  const handleEditProfileClick = () => {
    setActiveModal("EditProfile");
  };

  const handleEditSubmit = ({ name, avatar }) => {
    const token = getToken();
    return api
      .updateProfile({ name, avatar }, token)
      .then((data) => {
        setCurrentUser(data);
        //close modal
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Failed to save profile changes", error);
      });
  };

  const handleRegisterSubmit = ({ name, avatar, email, password }) => {
    return auth
      .addNewUser({
        name,
        avatar,
        email,
        password,
      })
      .then(() => {
        return auth.authenticateUser({ email, password });
      })
      .then((authenticateresponse) => {
        setToken(authenticateresponse.token);
        return api.getUserInfo(authenticateresponse.token);
      })
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
        closeActiveModal();
        navigate("/");
      })
      .catch((error) => {
        console.error("Failed to save clothing", error);
      });
  };

  const handleLogInSubmit = ({ email, password }) => {
    if (!email || !password) {
      return;
    }

    return auth
      .authenticateUser({
        email,
        password,
      })
      .then((data) => {
        console.log("Login response data:", data);
        if (data.token) {
          setToken(data.token);
          api.getUserInfo(data.token).then((userProfileData) => {
            setCurrentUser(userProfileData);
          });
          setIsLoggedIn(true);
        }

        //close modal
        closeActiveModal();
        navigate("/");
      })
      .catch((error) => {
        console.error("Failed to log in", error);
      });
  };

  useEffect(() => {
    console.log("useEffect running, checking for token...");
    const jwt = getToken();

    if (!jwt) {
      return;
    }

    api
      .getUserInfo(jwt)
      .then((userProfileData) => {
        // If the response is successful, log the user in, save their
        // data to state, and navigate them to /ducks.
        setIsLoggedIn(true);
        setCurrentUser(userProfileData);
      })
      .catch(console.error);
  }, []);

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    const token = getToken();
    return api
      .addNewClothing(
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
    api
      .getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        isLoggedIn,
        handleSignOut,
        handleEditProfileClick,
        activeModal,
        setClothingItems,
      }}
    >
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
                    onCardLike={handleCardLike}
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
                      handleCardLike={handleCardLike}
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
          <EditProfileModal
            isOpen={activeModal === "EditProfile"}
            closeActiveModal={closeActiveModal}
            onEditProfileSubmit={handleEditSubmit}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
