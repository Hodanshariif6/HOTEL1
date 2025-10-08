import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddRoom() {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [detail, setDetail] = useState("");
  const [img, setImage] = useState(null);

  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("quantity", quantity);
    formData.append("price", price);
    formData.append("desc", description);
    formData.append("detail", detail);
    formData.append("img", img); 

    try {
      await axios.post("http://localhost:7000/create/Room", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Room added successfully 🚀");
      setTimeout(() => navigate("/Room"), 2000);
    } catch (err) {
      console.error("❌ Upload Error:", err.response?.data || err.message);
      toast.error("Upload failed ❌");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800">Register Room</h2>

      <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Name" className="w-full border p-2 mb-2" />
      <input value={quantity} onChange={(e) => setQuantity(e.target.value)} type="number" placeholder="Quantity" className="w-full border p-2 mb-2" />
      <input value={price} onChange={(e) => setPrice(e.target.value)} type="number" placeholder="Price" className="w-full border p-2 mb-2" />
      <input value={description} onChange={(e) => setDescription(e.target.value)} type="text" placeholder="Description" className="w-full border p-2 mb-2" />
      <textarea value={detail} onChange={(e) => setDetail(e.target.value)} placeholder="Detail" className="w-full border p-2 mb-2"></textarea>

      <input onChange={(e) => setImage(e.target.files[0])} type="file" className="w-full mb-2" />

      <button onClick={handleCreate} className="w-full bg-purple-500 text-white p-2 rounded">
        Add Room
      </button>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default AddRoom;
