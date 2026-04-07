import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    api.get(`/products/${id}`).then((res) => setProduct(res.data));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto">
      <img
        src={product.imageUrl || "https://via.placeholder.com/600"}
        alt={product.name}
        className="w-full h-72 object-cover rounded-xl mb-6"
      />
      <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
      <p className="text-gray-500 mb-2">{product.category}</p>
      <p className="text-blue-600 text-2xl font-bold mb-4">R{product.price}</p>
      <p className="text-gray-700 mb-6">{product.description}</p>
      <p className="text-sm text-gray-500 mb-4">
        Stock: {product.stock} available
      </p>
      <button
        onClick={() => addToCart(product)}
        className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg"
      >
        Add to Cart
      </button>
    </div>
  );
}
