import "./ItemCard.css";

function ItemCard({ item, onCardClick }) {
  const handleCardClick = () => {
    onCardClick(item);
  };

  return (
    <li className="itemCard__container">
      <div className="itemCard__tile">
        <h2 className="itemCard__heading">{item.name}</h2>
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
