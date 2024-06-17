import { useContext } from "react";
import { currencyFormatter } from "../util/formatter";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";

export default function MealItem({ meal }) {
  const cartctx = useContext(CartContext);
  function handleAddItemToCart() {
    cartctx.addItem(meal);
  }
  return (
    <li className="meal-item">
      <article>
        <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">
            {currencyFormatter.format(meal.price)}
          </p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p className="meal-item-actions">
          <Button onClick={handleAddItemToCart}>Add Items To Cart</Button>
        </p>
      </article>
    </li>
  );
}
