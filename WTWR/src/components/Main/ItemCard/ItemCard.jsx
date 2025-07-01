import "./ItemCard.css";
import tshirt from "../../../assets/tshirt.png";
import cap from "../../../assets/cap.png";

function ItemCard({ item }) {
  return (
    <li className="itemCard__container">
      <div className="itemCard__tile">
        <h2 className="itemCard__heading">{item.name}</h2>
        <img src={item.link} alt={item.name} className="itemCard__image" />
      </div>
    </li>
  );
}

export default ItemCard;
