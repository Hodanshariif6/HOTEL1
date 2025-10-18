import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddNews() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImage] = useState(null);

  const navigate = useNavigate();

  const handleCreate = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("desc", description);
    formData.append("img", img);

    axios
      .post("http://localhost:7000/create/New", formData)
      .then(() => {
        toast.success("News added successfully 🚀");
        setTimeout(() => {
          navigate("/new");
        }, 2000);
      })
      .catch((error) => {
        toast.error("Failed to add news ❌");
        console.error(error);
      });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800">Register News</h2>

      <div>
        <label className="block text-gray-700 font-medium mb-1">News Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-1">Description</label>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          type="text"
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-1">Image</label>
        <input
          onChange={(e) => setImage(e.target.files[0])}
          type="file"
          className="w-full text-gray-700"
        />
      </div>

      <div>
        <button
          onClick={handleCreate}
          className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
        >
          Add News
        </button>
      </div>
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default AddNews;
