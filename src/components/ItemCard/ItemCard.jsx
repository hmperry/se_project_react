import "./ItemCard.css";
import like from "../../assets/like.svg";
import liked from "../../assets/liked.svg";
import { useContext, useState } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike, isLiked }) {
  const { handleCardLike } = useContext(CurrentUserContext);

  const handleCardClick = () => {
    onCardClick(item);
  };

  return (
    <li className="itemCard__container">
      <div className="itemCard__tile">
        <div className="itemCard__top-info">
          <h2 className="itemCard__heading">{item.name}</h2>
          <img
            onClick={() => onCardLike({ id: item._id, isLiked })}
            src={isLiked ? liked : like}
            alt="like button"
            className="itemCard__like"
          />
        </div>

        <img
          onClick={handleCardClick}
          src={item.imageUrl}
          alt={item.name}
          className="itemCard__image"
        />
      </div>
    </li>
  );
}

export default ItemCard;
