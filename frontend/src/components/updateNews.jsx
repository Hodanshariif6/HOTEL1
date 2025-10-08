import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UpdateNews() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [desc, setDescription] = useState("");
  const [imgFile, setImgFile] = useState(null);


  const fetchNews = async () => {
    try {
      const res = await axios.get(`http://localhost:7000/readSingle/New/${id}`);
      const news = Array.isArray(res.data) ? res.data[0] : res.data;

      if (!news) throw new Error("News not found");

      setName(news.name);
      setDescription(news.desc); 
      setPreview(`http://localhost:7000/allImages/${news.img}`); 
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("desc", desc); 

o
      if (imgFile) {
        formData.append("img", imgFile); 
      }

      await axios.put(`http://localhost:7000/update/new/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("News updated successfully! 🎉");
      setTimeout(() => navigate("/new"), 2000);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update news ❌");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800">Update News</h2>

      <div>
        <label className="block text-gray-700 font-medium mb-1">News Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Enter news title"
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-1">Description</label>
        <textarea
          value={desc}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          placeholder="Enter news description..."
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-1">Image</label>
        <input
          onChange={(e) => {
            const file = e.target.files[0];
            setImgFile(file);
            setPreview(URL.createObjectURL(file));
          }}
          type="file"
          accept="image/*"
          className="w-full text-gray-700"
        />
       
      </div>

      <button
        onClick={handleUpdate}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
      >
        Update News
      </button>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default UpdateNews;
