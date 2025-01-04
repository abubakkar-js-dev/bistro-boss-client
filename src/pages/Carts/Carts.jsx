import Loading from "../../components/Loading/Loading";
import useCarts from "../../hooks/useCarts";

const Carts = () => {
const {carts: cartItems,isLoading}= useCarts();
console.log(cartItems);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <h2>Cart: {cartItems.length}</h2>
    </div>
  );
};

export default Carts;
