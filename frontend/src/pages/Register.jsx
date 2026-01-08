import { useState, useContext } from "react";
import { useNavigate,Link } from "react-router-dom";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";
import React from "react";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/register", {
        name,
        email,
        password,
      });
      login(res.data);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-500 to-green-700 py-12">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-2xl w-96"
      >
        <h2 className="text-3xl font-bold mb-2 text-center text-gray-800">Create Account</h2>
        <p className="text-center text-gray-600 mb-6">Join ShopSphere today</p>

        {error && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded">{error}</div>}

        <input
          type="text"
          placeholder="👤 Full Name"
          className="w-full p-3 border-2 border-gray-300 mb-4 rounded-lg focus:outline-none focus:border-green-500"
          onChange={(e) => setName(e.target.value)}
          value={name}
          required
        />

        <input
          type="email"
          placeholder="📧 Email Address"
          className="w-full p-3 border-2 border-gray-300 mb-4 rounded-lg focus:outline-none focus:border-green-500"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />

        <input
          type="password"
          placeholder="🔒 Password"
          className="w-full p-3 border-2 border-gray-300 mb-6 rounded-lg focus:outline-none focus:border-green-500"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />

        <button className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-lg hover:from-green-700 hover:to-green-800 transition font-bold text-lg">
          Create Account
        </button>

        <p className="text-sm mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-green-600 font-bold hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
