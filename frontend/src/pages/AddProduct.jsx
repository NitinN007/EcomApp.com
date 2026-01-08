import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import React from "react";

const AddProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState("");
    const [image, setImage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/products", {
                name,
                price,
                description,
                category,
                stock,
                image,
            });
            alert("Product added successfully!");
            navigate("/admin");
        } catch (error) {
            console.error("Failed to add product", error);
            alert("Failed to add product");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Create a New Product
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Fill in the details below to add a new product to your store.
                    </p>
                </div>
                <form
                    className="mt-8 space-y-6 bg-white p-8 rounded-2xl shadow-2xl"
                    onSubmit={handleSubmit}
                >
                    <div className="rounded-md shadow-sm -space-y-px">
                        <InputField
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Product Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            position="top"
                        />
                        <InputField
                            id="price"
                            name="price"
                            type="number"
                            placeholder="Price (₹)"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <InputField
                            id="category"
                            name="category"
                            type="text"
                            placeholder="Category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                        <InputField
                            id="stock"
                            name="stock"
                            type="number"
                            placeholder="Stock Quantity"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                        />
                        <InputField
                            id="image"
                            name="image"
                            type="text"
                            placeholder="Image URL"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                        />
                        <div>
                            <label htmlFor="description" className="sr-only">
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                rows="3"
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Product Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            ></textarea>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
                        >
                            Add Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const InputField = ({ id, name, type, placeholder, value, onChange, position }) => {
    let roundedClass = "";
    if (position === "top") roundedClass = "rounded-t-md";
    else if (position === "bottom") roundedClass = "rounded-b-md";

    return (
        <div>
            <label htmlFor={id} className="sr-only">
                {placeholder}
            </label>
            <input
                id={id}
                name={name}
                type={type}
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm ${roundedClass}`}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required
            />
        </div>
    );
};

export default AddProduct;