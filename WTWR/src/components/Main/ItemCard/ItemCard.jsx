import "./ItemCard.css";
import tshirt from "../../../assets/tshirt.png";
import cap from "../../../assets/cap.png";

function ItemCard() {
  return (
    <div className="itemCard">
      <h1 className="itemCard__heading">
        Today is [44] / Your may want to wear:
      </h1>
      <div className="itemCard__container">
        <div className="itemCard__tile">
          <p className="itemCard__text">T-Shirt</p>
          <img src={tshirt} alt="" className="itemCard__image" />
        </div>
        <div className="itemCard__tile">
          <p className="itemCard__text">Cap</p>
          <img src={cap} alt="" className="itemCard__image" />
        </div>
        <div className="itemCard__tile">
          <p className="itemCard__text">Cap</p>
          <img src={cap} alt="" className="itemCard__image" />
        </div>
        <div className="itemCard__tile">
          <p className="itemCard__text">Cap</p>
          <img src={cap} alt="" className="itemCard__image" />
        </div>
        <div className="itemCard__tile">
          <p className="itemCard__text">Cap</p>
          <img src={cap} alt="" className="itemCard__image" />
        </div>
      </div>
    </div>
  );
}

export default ItemCard;
