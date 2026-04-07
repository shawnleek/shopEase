import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition">
      <img
        src={
          product.imageUrl ||
          `https://placehold.co/300x200/dbeafe/1d4ed8?text=${product.name}`
        }
        alt={product.name}
        className="w-full h-44 object-cover"
      />
      <div className="p-4">
        <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
          {product.category}
        </p>
        <h3 className="font-semibold text-gray-800 text-sm leading-snug mb-3">
          {product.name}
        </h3>
        <div className="flex justify-between items-center mb-3">
          <span className="text-blue-600 font-bold text-lg">
            R{product.price}
          </span>
          <span className="text-xs text-gray-400">{product.stock} left</span>
        </div>
        <div className="flex gap-2">
          <Link
            to={`/product/${product.id}`}
            className="flex-1 text-center border border-blue-600 text-blue-600 py-1.5 rounded-lg text-sm hover:bg-blue-50 transition"
          >
            View
          </Link>
          <button
            onClick={() => addToCart(product)}
            className="flex-1 bg-blue-600 text-white py-1.5 rounded-lg text-sm hover:bg-blue-700 transition"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
