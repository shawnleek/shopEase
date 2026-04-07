import { useState, useEffect } from "react";
import api from "../api/axios";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const categories = ["Electronics", "Clothing", "Books", "Home", "Sports"];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await api.get("/products");
    setProducts(res.data);
  };

  const handleSearch = async () => {
    if (!search) return fetchProducts();
    const res = await api.get(`/products/search?name=${search}`);
    setProducts(res.data);
  };

  const handleCategory = async (cat) => {
    setCategory(cat);
    if (!cat) return fetchProducts();
    const res = await api.get(`/products/category/${cat}`);
    setProducts(res.data);
  };

  return (
    <div>
      {/* Hero Banner */}
      <div className="bg-blue-600 text-white px-8 py-12 mb-8">
        <h1 className="text-4xl font-bold mb-2">Welcome to ShopEase</h1>
        <p className="text-blue-100 mb-6 text-lg">
          Discover thousands of products at unbeatable prices
        </p>
        <div className="flex gap-3 max-w-xl">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search products..."
            className="flex-1 px-4 py-3 rounded-lg text-gray-900 outline-none text-sm"
          />
          <button
            onClick={handleSearch}
            className="bg-amber-400 text-gray-900 px-6 py-3 rounded-lg font-semibold text-sm hover:bg-amber-300 transition"
          >
            Search
          </button>
        </div>
        <div className="flex gap-6 mt-6 text-sm text-blue-100">
          <span>
            <strong className="text-white">1,200+</strong> Products
          </span>
          <span>
            <strong className="text-white">5</strong> Categories
          </span>
          <span>
            <strong className="text-white">Free</strong> Shipping over R500
          </span>
        </div>
      </div>

      <div className="px-6">
        {/* Category Filter */}
        <div className="flex gap-2 mb-6 flex-wrap items-center">
          <span className="text-sm text-gray-500 mr-1">Filter:</span>
          <button
            onClick={() => handleCategory("")}
            className={`px-4 py-1.5 rounded-full text-sm border transition ${
              !category
                ? "bg-blue-600 text-white border-blue-600"
                : "border-gray-300 hover:border-blue-400"
            }`}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => handleCategory(c)}
              className={`px-4 py-1.5 rounded-full text-sm border transition ${
                category === c
                  ? "bg-blue-600 text-white border-blue-600"
                  : "border-gray-300 hover:border-blue-400"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Results Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            {category ? category : "All Products"}
          </h2>
          <span className="text-sm text-gray-500">
            {products.length} items found
          </span>
        </div>

        {/* Product Grid */}
        {products.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-5xl mb-4">🛍️</p>
            <p className="text-lg">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
