import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

export default function Customer() {
  const [data, setData] = useState([]);

  const loadData = async () => {
    try {
      const res = await axios.get("http://localhost:7000/Cabasho");
      setData(res.data);
    } catch (error) {
      console.error(error);
      setData([]);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:7000/Cabasho/${id}`);
      loadData(); // Reload after delete
    } catch (error) {
      console.error(error);
    }
  };

  if (data.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        <p>No customer data available.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <motion.div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Customer Info</h2>

        {data.map((item) => (
          <motion.div
            key={item._id}
            className="border-b border-gray-200 py-4 flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-gray-600">{item.email}</p>
              <p className="text-sm text-gray-500">{item.message}</p>
            </div>
            <button
              onClick={() => handleDelete(item._id)}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
            >
              Delete
            </button>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
