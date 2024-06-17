import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatter";
import Input from "./UI/Input";
import UserProgressContext from "../store/UserProgressContext";
import Button from "./UI/Button";
import useHttp from "../hooks/useHttp";

const config = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgCtx = useContext(UserProgressContext);
  const cartTotal = cartCtx.items.reduce((totalPrice, item) => {
    return totalPrice + item.quantity * item.price;
  }, 0);

  const {
    data,
    fetching: isLoading,
    error,
    sendRequest,
    clearData,
  } = useHttp("http://localhost:3000/orders", config, "");
  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const data = Object.fromEntries(formData.entries());
    console.log(data);

    sendRequest({
      order: {
        items: cartCtx.items,
        customer: data,
      },
    });

    //fetch("http://localhost:3000/orders", );
  }

  function handleFinish() {
    userProgCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();
  }
  let actions = (
    <>
      <Button type="button" onClick={userProgCtx.hideCheckout} textOnly>
        Close
      </Button>
      <Button>Submit</Button>
    </>
  );
  if (isLoading) {
    actions = <span>Sending Order Data...</span>;
  }

  if (data && !error) {
    return (
      <Modal open={userProgCtx.progress === "checkout"} onClose={handleFinish}>
        <h2>Success</h2>
        <p>Your order placed succesfully!</p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal
      open={userProgCtx.progress === "checkout"}
      onClose={userProgCtx.hideCheckout}
    >
      <form onSubmit={handleSubmit}>
        <h2>Checkout!</h2>
        <p>Total Amount:{currencyFormatter.format(cartTotal)}</p>
        <Input label="Full Name" type="text" id="name" />
        <Input label="E-mail Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>
        {error && <p>Error Occured!</p>}
        <p className="modal-action">{actions}</p>
      </form>
    </Modal>
  );
}
