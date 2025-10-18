import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [agreeTerms, setAgreeTerms] = useState(false);
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

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!agreeTerms) {
      toast.warning("Please agree to the Terms of Service");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:7000/register/customer", {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        password: formData.password
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      toast.success("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      toast.error(error.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#6721A1] to-[#C084FC] p-4">
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#6721A1] tracking-wide">
          CREATE ACCOUNT
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5 grid grid-cols-1">
          {/* Name */}
          <div className="space-y-2">
            <label className="block text-black font-medium text-lg">
              Your Name:
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full p-4 border-2 border-gray-300 rounded-xl text-black
                         focus:outline-none focus:border-[#6721A1] focus:ring-2 focus:ring-[#6721A1]/20
                         transition duration-200 placeholder-gray-400 text-lg"
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium text-lg">
              Phone Number:
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-4 border-2 border-gray-300 rounded-xl text-black
                         focus:outline-none focus:border-[#6721A1] focus:ring-2 focus:ring-[#6721A1]/20
                         transition duration-200 placeholder-gray-400 text-lg"
            />
          </div>

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
            <label className="block text-gray-700 font-medium text-lg">
              Password:
            </label>
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

          {/* Confirm Password */}
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium text-lg">
              Repeat your password:
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Repeat your password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-4 border-2 border-gray-300 rounded-xl text-black
                         focus:outline-none focus:border-[#6721A1] focus:ring-2 focus:ring-[#6721A1]/20
                         transition duration-200 placeholder-gray-400 text-lg"
            />
          </div>

          {/* Terms of Service */}
          <div className="flex items-center space-x-3 pt-2">
            <input
              type="checkbox"
              id="terms"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="w-5 h-5 text-[#6721A1] bg-gray-100 border-gray-300 rounded focus:ring-[#6721A1]"
            />
            <label htmlFor="terms" className="text-gray-700 text-lg">
              I agree all statements in{" "}
              <span className="text-[#6721A1] font-medium underline">
                Terms of service
              </span>
            </label>
          </div>

          {/* SIGN UP Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#6721A1] to-[#C084FC] text-white py-4 rounded-xl 
                       font-bold text-xl tracking-wide hover:opacity-90 hover:scale-[1.02] 
                       transition-all duration-300 shadow-lg mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating Account..." : "SIGN UP"}
          </button>
        </form>

        <div className="text-center mt-8 pt-6 border-t border-gray-200">
          <p className="text-gray-700 text-lg">
            Have already an account?{" "}
            <Link
              to="/login"
              className="text-[#6721A1] font-bold hover:underline hover:text-[#C084FC] transition"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
