import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({ clothingItems, handleCardClick, handleAddClick }) {
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
          // .filter((item) => {
          //   return item.weather === weatherData.type;
          // })
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
