import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Product";
import Cart from "./pages/Cart";
import Orders from "./pages/Order";
import Checkout from "./pages/Checkout";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import AddProduct from "./pages/AddProduct.jsx";
import UpdateProduct from "./pages/UpdateProduct.jsx";

function App() {
    return (
        <Router>
            <Navbar />

            {/* ⬇️ THIS IS THE KEY FIX */}
            <main className="pt-24">
                <Routes>
                    <Route path="/" element={<Products />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    <Route
                        path="/cart"
                        element={
                            <ProtectedRoute>
                                <Cart />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/checkout"
                        element={
                            <ProtectedRoute>
                                <Checkout />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/orders"
                        element={
                            <ProtectedRoute>
                                <Orders />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/admin"
                        element={
                            <ProtectedRoute admin>
                                <AdminDashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/add-product"
                        element={
                            <ProtectedRoute admin>
                                <AddProduct />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/update-product"
                        element={
                            <ProtectedRoute admin>
                                <UpdateProduct />
                            </ProtectedRoute>
                        }
                    />

                </Routes>
            </main>
        </Router>
    );
}


export default App;
