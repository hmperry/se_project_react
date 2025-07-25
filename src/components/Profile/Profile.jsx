import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";
// import SideBar from "./SideBar";
import ItemCard from "../ItemCard/ItemCard";
import "../Main/Main.css";
import SideBar from "../SideBar/SideBar";

function Profile({ clothingItems, handleCardClick, handleAddClick }) {
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
        />
      </section>
    </div>
  );
}

export default Profile;
