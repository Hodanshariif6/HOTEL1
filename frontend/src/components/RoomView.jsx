import axios from "axios";
import { motion } from "framer-motion"; 
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Room() {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const navigate = useNavigate();

  const handleReadData = () => {
    axios
      .post("http://localhost:7000/read/Room")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.error("Error fetching data:", err));
  };

  useEffect(() => {
    handleReadData();
  }, []);

  const handleLocalStorage = (room) => {
    const newData = JSON.parse(localStorage.getItem("products")) || [];
    const existId = newData.some((item) => String(item._id) === String(room._id));

    if (!existId) {
      newData.push(room);
      localStorage.setItem("products", JSON.stringify(newData));
      navigate("/booking"); 
    } else {
      navigate("/booking");
    }
  };

  const handleOpenModal = (room) => {
    setSelectedRoom(room);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRoom(null);
  };

  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  return (
    <>
      <div className="bg-gray-100 min-h-screen p-6">
        <h2
          className="text-3xl font-bold text-gray-800 mb-8 text-center"
          style={{ textShadow: "4px 2px 6px rgba(0, 0, 0, 0.4)" }}
        >
          HOTEL BOOKING
        </h2>

        <div className="flex overflow-x-auto gap-6 pb-4">
          {data.map((items, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white w-[300px] rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex-shrink-0 flex flex-col"
            >
              {/* Room Image */}
              <div className="relative">
                <img
                  src={`http://localhost:7000/allImages/${items.prImage}`}
                  alt={items.name}
                  className="w-full h-40 object-cover hover:scale-105 transition-transform duration-300"
                />
                <span
                  className={`absolute top-2 left-2 text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                    items.status === "Available"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {items.status}
                </span>
              </div>

              {/* Room Info */}
              <div className="p-4 flex flex-col justify-between flex-1">
                <div>
                  <h4 className="text-sm font-semibold text-gray-800 truncate">
                    {items.name}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {items.desc}
                  </p>
                </div>

                {/* Buttons & Price — spaced out */}
                <div className="flex justify-between items-center mt-4">
                  <p className="text-purple-600 font-bold text-sm">
                    ${items.price}
                  </p>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleOpenModal(items)}
                      className="px-3 py-1 bg-blue-500 text-white text-xs font-semibold rounded hover:bg-blue-600 transition"
                    >
                      View
                    </button>

                    <button
                      onClick={() => handleLocalStorage(items)}
                      disabled={items.status !== "Available"}
                      className={`${
                        items.status === "Available"
                          ? "px-3 py-1 bg-purple-500 text-white text-xs font-semibold rounded hover:bg-purple-600 transition"
                          : "px-3 py-1 bg-gray-300 text-gray-600 text-xs font-semibold rounded cursor-not-allowed line-through"
                      }`}
                    >
                      Book
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ====== MODAL ====== */}
        {showModal && selectedRoom && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white w-[90%] md:w-[500px] rounded-lg shadow-lg p-6 relative">
              <button
                onClick={handleCloseModal}
                className="absolute top-2 right-2 text-white bg-purple-400 hover:bg-purple-500 hover:text-white text-xl px-2 rounded"
              >
                &times;
              </button>

              <h2 className="text-xl font-bold mb-4 text-gray-800">
                {selectedRoom.name}
              </h2>

              <img
                src={`http://localhost:7000/allImages/${selectedRoom.prImage}`}
                alt={selectedRoom.name}
                className="w-full h-40 object-cover rounded mb-4"
              />

              <p className="text-sm text-gray-600 mb-2">
                <strong>Price:</strong> ${selectedRoom.price}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Short Description:</strong> {selectedRoom.desc}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Detail:</strong><br /> {selectedRoom.detail}
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Room;
