import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UpdateRoom() {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [detail, setDetail] = useState("");
  const [img, setImage] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  const fetchRoom = async () => {
    try {
      const res = await axios.get(`http://localhost:7000/readSingle/Room/${id}`);
      const room = Array.isArray(res.data) ? res.data[0] : res.data;

      if (!room) throw new Error("Room not found");

      setName(room.name);
      setQuantity(room.quantity);
      setPrice(room.price);
      setDescription(room.desc);
      setDetail(room.detail || "");
      setPreview(`http://localhost:7000/allImages/${room.prImage}`);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRoom();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("quantity", quantity);
      formData.append("price", price);
      formData.append("desc", description);
      formData.append("detail", detail);

      if (img && typeof img !== "string") {
        formData.append("img", img); 
      }

      await axios.put(`http://localhost:7000/update/Room/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Room updated successfully! 🎉");
      setTimeout(() => navigate("/Room"), 2000);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update room ❌");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); 
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800">Update Room</h2>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        placeholder="Room Name"
        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />

      <input
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        type="number"
        placeholder="Quantity"
        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />

      <input
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        type="number"
        placeholder="Price"
        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />

      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        type="text"
        placeholder="Description"
        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <textarea
        value={detail}
        onChange={(e) => setDetail(e.target.value)}
        rows={4}
        placeholder="Detailed description"
        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="w-full text-gray-700"
      />

      <button
        onClick={handleUpdate}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
      >
        Update Room
      </button>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default UpdateRoom;
