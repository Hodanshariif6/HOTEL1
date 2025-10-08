import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1️⃣ First try admin login
      let response = await axios.post("http://localhost:7000/login/admin", formData)
        .catch(async (adminErr) => {
          // 2️⃣ If admin fails, try customer login
          return await axios.post("http://localhost:7000/login/customer", formData);
        });

      const { token, user, message } = response.data;

      // Save token & user
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      if (rememberMe) localStorage.setItem("rememberMe", "true");

      toast.success(message || "Login successful!", {
        position: "top-center",
        autoClose: 2000,
      });

      // Navigate based on role
      setTimeout(() => {
        if (user.role === "admin") navigate("/dashboard");
        else navigate("/");
      }, 2000);

    } catch (error) {
      toast.error(error.response?.data?.error || "Invalid credentials", {
        position: "top-center",
        autoClose: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#6721A1] to-[#C084FC] p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#6721A1] tracking-wide">
          LOGIN
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5 grid grid-cols-1">
          {/* Email */}
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium text-lg">Your Email:</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full p-4 border-2 border-gray-300 rounded-xl text-black
                         focus:outline-none focus:border-[#6721A1] focus:ring-2 focus:ring-[#6721A1]/20
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
                         focus:outline-none focus:border-[#6721A1] focus:ring-2 focus:ring-[#6721A1]/20
                         transition duration-200 placeholder-gray-400 text-lg"
            />
          </div>

          {/* Remember Me */}
          <div className="flex justify-between items-center pt-2">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-5 h-5 text-[#6721A1] bg-gray-100 border-gray-300 rounded focus:ring-[#6721A1]"
              />
              <label htmlFor="remember" className="text-gray-700 text-lg">Remember me</label>
            </div>
            <Link to="/forgot-password" className="text-[#6721A1] font-medium text-lg hover:underline">
              Forgot password?
            </Link>
          </div>

          {/* LOGIN Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#6721A1] to-[#C084FC] text-white py-4 rounded-xl 
                       font-bold text-xl tracking-wide hover:opacity-90 hover:scale-[1.02] 
                       transition-all duration-300 shadow-lg mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "LOGIN"}
          </button>
        </form>

        <div className="text-center mt-8 pt-6 border-t border-gray-200">
          <p className="text-gray-700 text-lg">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-[#6721A1] font-bold hover:underline hover:text-[#C084FC] transition"
            >
              Sign up here
            </Link>
          </p>
        </div>
      </div>

      {/* Toast notification */}
      <ToastContainer />
    </div>
  );
}

export default Login;
