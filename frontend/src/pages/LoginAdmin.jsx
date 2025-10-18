import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginAdmin() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const trimmedEmail = formData.email.trim();
      const trimmedPassword = formData.password.trim();

      const res = await axios.post("http://localhost:7000/login/admin", {
        email: trimmedEmail,
        password: trimmedPassword,
      });

      // Store admin data and token
      localStorage.setItem("admin", JSON.stringify(res.data.admin));
      localStorage.setItem("token", res.data.token);

      toast.success("✅ Login successful!", {
        position: "top-center",
        autoClose: 2000,
      });

      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (err) {
      const message =
        err.response?.data?.error || "❌ Invalid email or password!";
      toast.error(message, { position: "top-center", autoClose: 2500 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#3a0b5b] to-[#e13bf6] p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#621e8a] tracking-wide">
          ADMIN LOGIN
        </h2>

        <form onSubmit={handleLogin} className="space-y-6 grid grid-cols-1">
          {/* Email */}
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium text-lg">Email Address:</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full p-4 border-2 border-gray-300 rounded-xl text-black
                         focus:outline-none focus:border-[#621e8a] focus:ring-2 focus:ring-[#621e8a]/20
                         transition duration-200 placeholder-gray-400 text-lg"
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium text-lg">Password:</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full p-4 border-2 border-gray-300 rounded-xl text-black
                         focus:outline-none focus:border-[#621e8a] focus:ring-2 focus:ring-[#621e8a]/20
                         transition duration-200 placeholder-gray-400 text-lg"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#5d1e8a] to-[#ab3bf6] text-white py-4 rounded-xl 
                       font-bold text-xl tracking-wide hover:opacity-90 hover:scale-[1.02] 
                       transition-all duration-300 shadow-lg mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "LOGIN"}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-8 pt-6 border-t border-gray-200">
          <p className="text-gray-700 text-lg">
            Don’t have an account?{" "}
            <Link
              to="/registerAdmin"
              className="text-[#621e8a] font-bold hover:underline hover:text-[#9b3bf6] transition"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}
