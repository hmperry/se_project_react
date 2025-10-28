import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import { useContext, useState } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ClothesSection({ clothingItems, handleCardClick, handleAddClick }) {
  const { currentUser } = useContext(CurrentUserContext);
  console.log("ClothesSection is rendering");
  console.log("currentUser:", currentUser);
  return (
    <div className="clothes-section">
      <div className="clothes-section__subhead">
        Your items
        <button
          onClick={handleAddClick}
          type="button"
          className="clothes-section__add-new"
        >
          + Add Clothes
        </button>
      </div>
      <ul className="cards__list">
        {clothingItems
          .filter((item) => {
            return item.owner === currentUser._id;
          })
          .map((item) => {
            return (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={handleCardClick}
              />
            );
          })}
      </ul>
    </div>
  );
}

export default ClothesSection;
