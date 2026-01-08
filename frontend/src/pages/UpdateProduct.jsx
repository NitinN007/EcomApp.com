import { useEffect, useState } from "react";
import api from "../services/api";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
        image: ""
    });
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await api.get("/products?limit=100");
            setProducts(response.data.products);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const handleProductSelect = async (productId) => {
        try {
            const response = await api.get(`/products/${productId}`);
            setSelectedProduct(response.data);
            setFormData({
                name: response.data.name,
                description: response.data.description,
                price: response.data.price,
                category: response.data.category,
                stock: response.data.stock,
                image: response.data.image
            });
        } catch (error) {
            console.error("Error fetching product:", error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedProduct) return;

        setLoading(true);
        try {
            await api.put(`/products/${selectedProduct._id}`, formData);
            alert("Product updated successfully!");
            fetchProducts();
            setSelectedProduct(null);
            setFormData({
                name: "",
                description: "",
                price: "",
                category: "",
                stock: "",
                image: ""
            });
        } catch (error) {
            alert("Failed to update product: " + error.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (productId) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;

        try {
            await api.delete(`/products/${productId}`);
            alert("Product deleted successfully!");
            fetchProducts();
            if (selectedProduct?._id === productId) {
                setSelectedProduct(null);
                setFormData({
                    name: "",
                    description: "",
                    price: "",
                    category: "",
                    stock: "",
                    image: ""
                });
            }
        } catch (error) {
            alert("Failed to delete product: " + error.response?.data?.message);
        }
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Update Product</h1>
                            <p className="text-gray-600 mt-1">Select a product to update or delete</p>
                        </div>
                        <Link
                            to="/admin/dashboard"
                            className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition font-medium shadow-sm"
                        >
                            ← Back to Dashboard
                        </Link>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Products List */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                        <div className="px-6 py-5 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Products</h2>
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="p-6 max-h-[600px] overflow-y-auto">
                            {filteredProducts.length === 0 ? (
                                <div className="text-center py-12">
                                    <p className="text-gray-500">No products found</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {filteredProducts.map((product) => (
                                        <div
                                            key={product._id}
                                            className={`border rounded-lg p-4 cursor-pointer transition-all ${
                                                selectedProduct?._id === product._id
                                                    ? "border-blue-500 bg-blue-50"
                                                    : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                                            }`}
                                            onClick={() => handleProductSelect(product._id)}
                                        >
                                            <div className="flex gap-4">
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="w-16 h-16 object-cover rounded-lg"
                                                />
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-gray-900">{product.name}</h3>
                                                    <p className="text-sm text-gray-600">{product.category}</p>
                                                    <p className="text-blue-600 font-semibold mt-1">₹{product.price}</p>
                                                </div>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDelete(product._id);
                                                    }}
                                                    className="text-red-600 hover:text-red-700 px-3 py-1 rounded-lg hover:bg-red-50 transition h-fit"
                                                >
                                                    🗑️
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Update Form */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                        <div className="px-6 py-5 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-900">
                                {selectedProduct ? "Edit Product" : "Select a Product"}
                            </h2>
                        </div>

                        <div className="p-6">
                            {!selectedProduct ? (
                                <div className="text-center py-12">
                                    <div className="text-6xl mb-4">📦</div>
                                    <p className="text-gray-500 text-lg">Select a product from the list</p>
                                    <p className="text-gray-400 text-sm mt-2">Click on any product to edit its details</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Product Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Description
                                        </label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            required
                                            rows="4"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Price (₹)
                                            </label>
                                            <input
                                                type="number"
                                                name="price"
                                                value={formData.price}
                                                onChange={handleChange}
                                                required
                                                min="0"
                                                step="0.01"
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Stock
                                            </label>
                                            <input
                                                type="number"
                                                name="stock"
                                                value={formData.stock}
                                                onChange={handleChange}
                                                required
                                                min="0"
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Category
                                        </label>
                                        <input
                                            type="text"
                                            name="category"
                                            value={formData.category}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Image URL
                                        </label>
                                        <input
                                            type="url"
                                            name="image"
                                            value={formData.image}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    {formData.image && (
                                        <div className="mt-4">
                                            <p className="text-sm font-medium text-gray-700 mb-2">Preview</p>
                                            <img
                                                src={formData.image}
                                                alt="Preview"
                                                className="w-full h-48 object-cover rounded-lg border border-gray-200"
                                            />
                                        </div>
                                    )}

                                    <div className="flex gap-3 pt-4">
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {loading ? "Updating..." : "Update Product"}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setSelectedProduct(null);
                                                setFormData({
                                                    name: "",
                                                    description: "",
                                                    price: "",
                                                    category: "",
                                                    stock: "",
                                                    image: ""
                                                });
                                            }}
                                            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateProduct;