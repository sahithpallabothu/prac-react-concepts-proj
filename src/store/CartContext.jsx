//To create context we use CreateContext hook
import { createContext } from "react";
import { useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
});

function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const exisitngCartIndex = state.items.findIndex(
      (item) => item.id === action.payload.id
    );

    const updatedItems = [...state.items];
    if (exisitngCartIndex > -1) {
      const existingItem = state.items[exisitngCartIndex];
      const updatedItem = {
        ...existingItem,
        quantity: state.items[exisitngCartIndex].quantity + 1,
      };
      updatedItems[exisitngCartIndex] = updatedItem;
    } else {
      updatedItems.push({ ...action.payload, quantity: 1 });
    }

    return { ...state, items: updatedItems };
  }
  if (action.type === "REMOVE_ITEM") {
    const exisitngCartIndex = state.items.findIndex(
      (item) => item.id === action.payload.id
    );

    const existingItem = state.items[exisitngCartIndex];
    const updatedItems = [...state.items];
    if (existingItem.quantity === 1) {
      updatedItems.splice(exisitngCartIndex, 1);
    } else if (existingItem.quantity > 1) {
      const updatedItem = {
        ...existingItem,
        quantity: state.items[exisitngCartIndex].quantity - 1,
      };
      updatedItems[exisitngCartIndex] = updatedItem;
    }

    return { ...state, items: updatedItems };
  }
  if (action.type === "CLEAR_CART") {
    return { ...state, items: [] };
  }
  return state;
}

export function CartContextProvider({ children }) {
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

  function addItem(item) {
    dispatchCartAction({ type: "ADD_ITEM", payload: item });
  }
  function removeItem(id) {
    dispatchCartAction({ type: "REMOVE_ITEM", payload: { id: id } });
  }

  function clearCart() {
    dispatchCartAction({ type: "CLEAR_CART" });
  }
  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
    clearCart,
  };

  console.log(cartContext);
  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}

export default CartContext;
