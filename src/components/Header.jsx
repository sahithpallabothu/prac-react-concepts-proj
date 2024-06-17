import { useContext } from "react";
import logoImg from "../assets/logo.jpg";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";

export default function Header() {
  const cartCtx = useContext(CartContext);
  const userProgCtx = useContext(UserProgressContext);
  const totalCartItems = cartCtx.items.reduce((totalNoOfItems, item) => {
    return totalNoOfItems + item.quantity;
  }, 0);
  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="A Restuarnt" />
        <h1>React Food</h1>
      </div>
      <nav>
        <Button textOnly onClick={userProgCtx.showCart}>
          Cart ({totalCartItems})
        </Button>
      </nav>
    </header>
  );
}
