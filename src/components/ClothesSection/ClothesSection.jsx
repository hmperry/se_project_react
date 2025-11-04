import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import { useContext, useState } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import * as api from "../../utils/api.js";

function ClothesSection({
  clothingItems,
  handleCardClick,
  handleAddClick,
  onCardLike,
}) {
  const { currentUser, setClothingItems } = useContext(CurrentUserContext);
  console.log("ClothesSection is rendering");
  console.log("currentUser:", currentUser);

  // const handleCardLike = ({ id, isLiked }) => {
  //   const token = localStorage.getItem("jwt");
  //   // Check if this card is not currently liked
  //   !isLiked
  //     ? // if so, send a request to add the user's id to the card's likes array
  //       api
  //         // the first argument is the card's id
  //         .addCardLike(id, token)
  //         .then((updatedCard) => {
  //           setClothingItems((cards) =>
  //             cards.map((item) => (item._id === id ? updatedCard : item))
  //           );
  //         })
  //         .catch((err) => console.log(err))
  //     : // if not, send a request to remove the user's id from the card's likes array
  //       api
  //         // the first argument is the card's id
  //         .removeCardLike(id, token)
  //         .then((updatedCard) => {
  //           setClothingItems((cards) =>
  //             cards.map((item) => (item._id === id ? updatedCard : item))
  //           );
  //         })
  //         .catch((err) => console.log(err));
  // };

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
                onCardLike={onCardLike}
                isLiked={item.likes.includes(currentUser._id)}
              />
            );
          })}
      </ul>
    </div>
  );
}

export default ClothesSection;
