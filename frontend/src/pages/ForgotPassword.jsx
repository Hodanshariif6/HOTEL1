import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await axios.post("http://localhost:7000/forgot-password", { email });
      
      if (res.data.resetToken) {
        toast.success(`Reset token: ${res.data.resetToken} - Copy this token!`);
        setStep(2);
      } else {
        toast.info(res.data.message || "Check your email for reset instructions");
        setStep(2); // Still move to next step for security
      }
    } catch (err) {
      console.error("Forgot password error:", err);
      toast.error(err.response?.data?.message || "Error sending reset token");
    } finally {
      setLoading(false);
    }
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    
    setLoading(true);
    
    try {
      const res = await axios.post("http://localhost:7000/reset-password", { 
        token: token.trim(), 
        newPassword 
      });
      
      toast.success("Password reset successfully!");
      setTimeout(() => (window.location.href = "/login"), 2000);
    } catch (err) {
      console.error("Reset password error:", err);
      const errorMsg = err.response?.data?.message || 
                      err.response?.data?.details || 
                      "Error resetting password";
      toast.error(errorMsg);
      
      // If token is invalid, allow going back
      if (err.response?.status === 400) {
        setStep(1);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <ToastContainer position="top-center" autoClose={5000} />
      <div className="bg-white p-8 rounded-xl shadow-xl w-96">
        {step === 1 ? (
          <form onSubmit={handleEmailSubmit} className="grid grid-cols-1">
            <h2 className="text-xl font-bold mb-4 text-center">Forgot Password</h2>
            <p className="text-sm text-gray-600 mb-4 text-center">
              Enter your email to receive a reset token
            </p>
            
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full border border-gray-300 p-3 rounded mb-4 text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-purple-600 text-white p-3 rounded hover:bg-purple-700 disabled:bg-purple-400"
            >
              {loading ? "Sending..." : "Send Reset Token"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetSubmit} className="grid grid-cols-1">
            <h2 className="text-xl font-bold mb-4 text-center">Reset Password</h2>
            <p className="text-sm text-gray-600 mb-4 text-center">
              Enter the token and your new password
            </p>
            
            <input
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Enter reset token"
              className="w-full border border-gray-300 p-3 rounded mb-4 text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password (min 6 characters)"
              className="w-full border border-gray-300 p-3 rounded mb-4 text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
              minLength={6}
            />
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-purple-600 text-white p-3 rounded hover:bg-purple-700 disabled:bg-purple-400"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
            
            <button 
              type="button"
              onClick={() => setStep(1)}
              className="w-full mt-2 text-purple-600 p-2 rounded hover:bg-purple-50"
            >
              Back to Email
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;