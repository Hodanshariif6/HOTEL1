import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaTrash, FaMinus, FaPlus, FaBed } from "react-icons/fa";

function Booking() {
  const [bookingData, setBookingData] = useState([]);
  const [profile, setProfile] = useState(null);

  const roomTypePrices = { single: 0, double: 30, family: 60 };

  // Load saved products from localStorage
  useEffect(() => {
    const getData = JSON.parse(localStorage.getItem("products")) || [];
    const update = getData.map((item) => ({
      ...item,
      quantity: 1,
      maxQuantity: item.quantity || 10,
      roomType: item.roomType || "single",
      checkIn: item.checkIn || "",
      checkOut: item.checkOut || "",
      nights: item.nights || 0,
    }));
    setBookingData(update);
  }, []);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(bookingData));
  }, [bookingData]);

  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem("profile"));
    if (savedProfile) setProfile(savedProfile);

    const handleProfileUpdate = () => {
      const updatedProfile = JSON.parse(localStorage.getItem("profile"));
      setProfile(updatedProfile);
    };
    window.addEventListener("profileUpdated", handleProfileUpdate);
    return () => window.removeEventListener("profileUpdated", handleProfileUpdate);
  }, []);

  // Get customer data
  const getCustomer = localStorage.getItem("customer");
  let customerName = "";
  let customerEmail = "";
  let customerPhone = "";
  if (getCustomer) {
    try {
      const customerData = JSON.parse(getCustomer)?.data?.customer;
      customerName = customerData?.name || "";
      customerEmail = customerData?.email || "";
      customerPhone = customerData?.phone || "";
    } catch (err) {
      console.log("Customer parse error:", err);
    }
  }

  // Handle check-in/out date change
  const handleDateChange = (id, type, value) => {
    setBookingData((data) =>
      data.map((room) => {
        if (room._id === id) {
          let checkIn = room.checkIn;
          let checkOut = room.checkOut;
          if (type === "checkIn") checkIn = value;
          if (type === "checkOut") checkOut = value;

          let nights = 0;
          if (checkIn && checkOut) {
            const start = new Date(checkIn);
            const end = new Date(checkOut);
            if (end <= start) {
              alert("❌ Check-out must be after check-in");
              checkOut = "";
            } else {
              nights = Math.ceil((end - start) / (1000 * 3600 * 24));
            }
          }
          return { ...room, checkIn, checkOut, nights };
        }
        return room;
      })
    );
  };

  // Handle booking
  const handleBooking = async (room) => {
    if (!room.checkIn || !room.checkOut || room.nights <= 0) {
      alert("⚠️ Please select valid check-in and check-out dates.");
      return;
    }

    if (!customerName) {
      alert("⚠️ Please login first!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:7000/create/order", {
        customer: {
          name: customerName,
          email: customerEmail,
          phone: customerPhone,
        },
        rooms: [
          {
            productId: room._id,
            quantity: room.quantity,
            roomType: room.roomType,
            nights: room.nights,
          },
        ],
        checkIn: room.checkIn,
        checkOut: room.checkOut,
      });

      if (res.data.error) {
        alert(res.data.error);
      } else {
        alert(`✅ Booking successful for ${room.name}`);
        const updated = bookingData.filter((item) => item._id !== room._id);
        localStorage.setItem("products", JSON.stringify(updated));
        setBookingData(updated);
      }
    } catch (err) {
      console.error("Booking error:", err);
      alert("❌ Server error while booking.");
    }
  };

  // Quantity increment/decrement
  const handleIncrement = (id) =>
    setBookingData((data) =>
      data.map((item) =>
        item._id === id
          ? { ...item, quantity: Math.min(item.quantity + 1, item.maxQuantity) }
          : item
      )
    );

  const handleDecrement = (id) =>
    setBookingData((data) =>
      data.map((item) =>
        item._id === id
          ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
          : item
      )
    );

  const calculateTotal = (room) => {
    const basePrice = room.price;
    const extra = roomTypePrices[room.roomType] || 0;
    return (basePrice + extra) * room.nights * room.quantity;
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-6"
      >
        <h3 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
          <FaBed className="text-purple-600" /> Your Bookings
        </h3>

        {bookingData.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No bookings yet</p>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="border-b text-gray-600 text-sm">
                <th className="py-3">ROOM DETAILS</th>
                <th className="text-center">BOOKING</th>
                <th>TYPE</th>
                <th>TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {bookingData.map((room) => (
                <motion.tr
                  key={room._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="border-b hover:bg-gray-50 transition text-sm"
                >
                  <td className="py-4 flex items-center gap-4">
                    <img
                      src={`http://localhost:7000/allImages/${room.prImage?.trim()}`}
                      alt={room.name}
                      className="w-20 h-16 object-cover rounded-lg shadow-sm"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-800">{room.name}</h3>
                      <div className="flex gap-2 mt-2">
                        <input
                          type="date"
                          value={room.checkIn}
                          onChange={(e) =>
                            handleDateChange(room._id, "checkIn", e.target.value)
                          }
                          className="border p-1 rounded text-xs"
                        />
                        <input
                          type="date"
                          value={room.checkOut}
                          onChange={(e) =>
                            handleDateChange(room._id, "checkOut", e.target.value)
                          }
                          className="border p-1 rounded text-xs"
                        />
                      </div>
                    </div>
                  </td>

                  <td className="text-center">
                    <div className="flex items-center gap-2 justify-center">
                      <button
                        onClick={() => handleDecrement(room._id)}
                        disabled={room.quantity <= 1}
                        className="px-2 py-1 border rounded bg-gray-100 hover:bg-gray-200"
                      >
                        <FaMinus />
                      </button>
                      <span className="px-2 font-medium">{room.quantity}</span>
                      <button
                        onClick={() => handleIncrement(room._id)}
                        disabled={room.quantity >= room.maxQuantity}
                        className="px-2 py-1 border rounded bg-purple-600 text-white hover:bg-purple-700"
                      >
                        <FaPlus />
                      </button>
                    </div>
                  </td>

                  <td>
                    <select
                      value={room.roomType}
                      onChange={(e) =>
                        setBookingData((data) =>
                          data.map((item) =>
                            item._id === room._id
                              ? { ...item, roomType: e.target.value }
                              : item
                          )
                        )
                      }
                      className="border rounded p-1 text-sm"
                    >
                      <option value="single">Single</option>
                      <option value="double">Double (+$30/night)</option>
                      <option value="family">Family (+$60/night)</option>
                    </select>
                  </td>

                  <td className="font-semibold text-gray-700">
                    ${calculateTotal(room).toFixed(2)}
                    <button
                      onClick={() => handleBooking(room)}
                      className="mt-2 ml-4 bg-purple-600 hover:bg-purple-700 text-white px-5 py-3 rounded text-xs"
                    >
                      Book Now
                    </button>
                    {room.nights > 0 && (
                      <p className="text-xs text-gray-500 mt-1">
                        Nights: {room.nights}
                      </p>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        )}
      </motion.div>
    </div>
  );
}

export default Booking;
