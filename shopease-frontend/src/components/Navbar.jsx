import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  const { cart } = useCart();
  const itemCount = cart.reduce((s, i) => s + i.quantity, 0);

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold">
        ShopEase
      </Link>
      <div className="flex gap-6 items-center">
        <Link to="/">Home</Link>
        <Link to="/cart" className="relative">
          Cart
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </Link>
        {isLoggedIn ? (
          <>
            <Link to="/orders">Orders</Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
