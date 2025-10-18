import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RegisterAdmin() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:7000/create/admin", formData);

      toast.success("✅ Admin registered successfully!", {
        position: "top-center",
        autoClose: 2000,
      });

      setTimeout(() => navigate("/loginAdmin"), 2000);
    } catch (err) {
      const message =
        err.response?.data?.error ||
        "⚠️ Registration failed. Try again later.";
      toast.error(message, { position: "top-center", autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#601e8a] to-[#e33bf6] p-4">
      <div className="bg-slate-500 rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#621e8a] tracking-wide">
          CREATE ADMIN ACCOUNT
        </h2>

        <form onSubmit={handleRegister} className="space-y-6 grid grid-cols-1">
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium text-lg">Full Name:</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full p-4 border-2 border-gray-300 rounded-xl text-black
                         focus:outline-none focus:border-[#601e8a] focus:ring-2 focus:ring-[#601e8a]/20
                         transition duration-200 placeholder-gray-400 text-lg"
            />
          </div>

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
                         focus:outline-none focus:border-[#621e8a] focus:ring-2 focus:ring-[#601e8a]/20
                         transition duration-200 placeholder-gray-400 text-lg"
            />
          </div>

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
                         focus:outline-none focus:border-[#621e8a] focus:ring-2 focus:ring-[#601e8a]/20
                         transition duration-200 placeholder-gray-400 text-lg"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#5d1e8a] to-[#ab3bf6] text-white py-4 rounded-xl 
                       font-bold text-xl tracking-wide hover:opacity-90 hover:scale-[1.02] 
                       transition-all duration-300 shadow-lg mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Registering..." : "REGISTER"}
          </button>
        </form>

        <div className="text-center mt-8 pt-6 border-t border-gray-200">
          <p className="text-gray-700 text-lg">
            Already have an account?{" "}
            <Link
              to="/loginAdmin"
              className="text-[#591e8a] font-bold hover:underline hover:text-[#993bf6] transition"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
