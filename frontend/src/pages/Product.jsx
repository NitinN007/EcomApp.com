import { useEffect, useState } from "react";
import api from "../services/api";
import Spinner from "../components/Spinner";
import React from "react";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

// ✅ Toast imports
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // ⭐ Rating UI
  const StarRating = ({ rating = 0 }) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <div className="flex items-center gap-1">
        {Array(fullStars)
          .fill(0)
          .map((_, i) => (
            <FaStar key={"full" + i} className="text-yellow-400 text-sm" />
          ))}

        {halfStar && <FaStarHalfAlt className="text-yellow-400 text-sm" />}

        {Array(emptyStars)
          .fill(0)
          .map((_, i) => (
            <FaRegStar key={"empty" + i} className="text-yellow-400 text-sm" />
          ))}

        <span className="ml-2 text-xs text-gray-500">
          ({rating.toFixed(1)})
        </span>
      </div>
    );
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await api.get(
          `/products?keyword=${keyword}&page=${page}&limit=6`
        );
        setProducts(res.data.products);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load products!");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, keyword]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
  };

  // ✅ alert removed and toast added
  const addToCart = async (productId) => {
    try {
      await api.post("/cart/add", { productId, quantity: 1 });

      toast.success("✅ Added to cart!", {
        position: "top-right",
        autoClose: 1500,
      });
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to add to cart!", {
        position: "top-right",
        autoClose: 1500,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      {/* ✅ Toast Container */}
      <ToastContainer />

      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-2 text-center text-gray-800">
          🏪 Our Products
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Discover amazing products at great prices
        </p>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex justify-center mb-8">
          <input
            className="border-2 border-gray-300 p-3 w-80 rounded-l-lg focus:outline-none focus:border-blue-500"
            placeholder="Search products..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button className="bg-blue-600 text-white px-6 rounded-r-lg hover:bg-blue-700 transition font-semibold">
            🔍 Search
          </button>
        </form>

        {/* Loading */}
        {loading && <Spinner />}

        {/* Empty State */}
        {!loading && products.length === 0 && (
          <p className="text-center text-gray-500 text-lg mt-10">
            😕 No products found
          </p>
        )}

        {/* Products Grid */}
        {!loading && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((p) => (
              <div
                key={p._id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 ease-in-out"
              >
                <div className="h-64 bg-gray-200 flex items-center justify-center">
                  <img
                    src={p.image || "https://via.placeholder.com/300"}
                    alt={p.name}
                    className="h-full w-full object-contain"
                  />
                </div>

                <div className="p-6">
                  <h2 className="font-bold text-2xl text-gray-800 mb-2 truncate">
                    {p.name}
                  </h2>

                  {/* ⭐ Rating */}
                  <div className="mb-2">
                    <StarRating rating={p.rating || 4.5} />
                  </div>

                  <p className="text-gray-600 text-sm mb-3">{p.category}</p>

                  <p className="text-gray-700 text-sm mb-4 h-10 overflow-hidden">
                    {p.description}
                  </p>

                  <div className="flex justify-between items-center mb-4">
                    <span className="text-3xl font-bold text-blue-600">
                      ₹{p.price.toLocaleString()}
                    </span>

                    <span
                      className={`text-sm font-medium px-3 py-1 rounded-full ${
                        p.stock > 0
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {p.stock > 0 ? `${p.stock} in stock` : "Out of Stock"}
                    </span>
                  </div>

                  <button
                    onClick={() => addToCart(p._id)}
                    disabled={p.stock === 0}
                    className="w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    🛒 Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="flex justify-center items-center mt-12 gap-4">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-6 py-3 bg-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-400 transition font-semibold"
            >
              ← Prev
            </button>

            <div className="px-6 py-3 bg-white rounded-lg border-2 border-blue-500 font-semibold text-gray-800">
              Page {page} of {totalPages}
            </div>

            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="px-6 py-3 bg-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-400 transition font-semibold"
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
