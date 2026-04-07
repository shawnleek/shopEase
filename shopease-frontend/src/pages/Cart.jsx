import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, total } = useCart();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const placeOrder = async () => {
    if (!isLoggedIn) return navigate("/login");
    const order = {
      items: cart.map((i) => ({
        productId: i.id,
        productName: i.name,
        quantity: i.quantity,
        price: i.price,
      })),
      totalPrice: total,
    };
    await api.post("/orders", order);
    clearCart();
    navigate("/orders");
  };

  if (cart.length === 0)
    return <p className="text-center mt-20 text-xl">Your cart is empty.</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      {cart.map((item) => (
        <div key={item.id} className="flex items-center gap-4 border-b py-4">
          <img
            src={item.imageUrl || "https://via.placeholder.com/80"}
            alt={item.name}
            className="w-20 h-20 object-cover rounded"
          />
          <div className="flex-1">
            <h3 className="font-semibold">{item.name}</h3>
            <p className="text-blue-600 font-bold">R{item.price}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="w-8 h-8 border rounded"
            >
              -
            </button>
            <span>{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="w-8 h-8 border rounded"
            >
              +
            </button>
          </div>
          <button
            onClick={() => removeFromCart(item.id)}
            className="text-red-500 hover:text-red-700"
          >
            Remove
          </button>
        </div>
      ))}
      <div className="mt-8 text-right">
        <p className="text-2xl font-bold mb-4">Total: R{total.toFixed(2)}</p>
        <button
          onClick={placeOrder}
          className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}
