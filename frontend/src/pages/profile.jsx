import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Profile() {
  const [user, setUser] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const userObj = JSON.parse(userData);
      setUser(userObj);

      const savedImage = localStorage.getItem(`userImage_${userObj.email}`);
      if (savedImage) setImage(savedImage);

      localStorage.setItem("customer", JSON.stringify({ data: { customer: userObj } }));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("customer");
    toast.success("Logged out successfully!");
    setTimeout(() => navigate("/"), 1000);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      toast.error("The image must be less than 2MB");
      return;
    }

    setLoading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      const imageData = reader.result;
      setImage(imageData);

      if (user && user.email) {
        localStorage.setItem(`userImage_${user.email}`, imageData);
        toast.success("Image uploaded successfully! 🎉");
      }
      setLoading(false);
    };
    reader.onerror = () => {
      toast.error("Failed to upload image");
      setLoading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    if (user && user.email) {
      localStorage.removeItem(`userImage_${user.email}`);
      setImage(null);
      toast.success("Image removed successfully ✅");
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-xl text-gray-700">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-[#C186F9] text-white p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">User Profile</h2>
              <p className="text-white/80 mt-1">Manage your account settings</p>
            </div>
            <div className="relative">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-white/20 rounded-full flex items-center justify-center overflow-hidden border-2 border-white/30 shadow-lg">
                {image ? (
                  <img src={image} alt="User" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-white text-xl md:text-2xl font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              {image && (
                <button
                  onClick={handleRemoveImage}
                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow-lg"
                >
                  ×
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Profile Picture Upload */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Profile Picture
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={loading}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#C186F9] focus:border-[#C186F9] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
              {image && (
                <button
                  onClick={handleRemoveImage}
                  disabled={loading}
                  className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  Remove
                </button>
              )}
            </div>
            {loading && <p className="text-sm text-blue-600 mt-2">Uploading image...</p>}
          </div>

          {/* User Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <label className="block text-sm font-medium text-gray-700">Full Name:</label>
              <p className="text-gray-900 font-medium">{user.name}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <label className="block text-sm font-medium text-gray-700">Phone:</label>
              <p className="text-gray-900 font-medium">{user.phone || "N/A"}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <label className="block text-sm font-medium text-gray-700">Email:</label>
              <p className="text-gray-900 font-medium">{user.email}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <label className="block text-sm font-medium text-gray-700">Account Type:</label>
              <p className="text-gray-900 font-medium">{user.role || "CUSTOMER"}</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-4">
            <button
              onClick={() => navigate("/")}
              className="bg-[#C186F9] text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90"
            >
              Back to Home
            </button>
            <button
              onClick={handleLogout}
              className="bg-[#4CAF50] text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" />
    </div>
  );
}

export default Profile;
