import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";
// import SideBar from "./SideBar";
import ItemCard from "../ItemCard/ItemCard";
import "../Main/Main.css";
import SideBar from "../SideBar/SideBar";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Profile({
  clothingItems,
  handleCardClick,
  handleAddClick,
  handleCardLike,
}) {
  const { currentUser } = useContext(CurrentUserContext);
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
      </section>
      <section className="profile__clothes-section">
        <ClothesSection
          clothingItems={clothingItems}
          handleCardClick={handleCardClick}
          handleAddClick={handleAddClick}
          onCardLike={handleCardLike}
        />
      </section>
    </div>
  );
}

export default Profile;
