import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function News() {
  const [data, setData] = useState([]);

  // Fetch Data
  const handleReadData = () => {
    axios.get("http://localhost:7000/read/New").then((res) => {
      setData(res.data);
    });
  };

  useEffect(() => {
    handleReadData();
  }, []);

  // Delete item
  const handleDelete = (id) => {
    axios.delete(`http://localhost:7000/delete/New/${id}`).then(() => {
      alert("Success delete");
      handleReadData();
    });
  };

  return (
    <div className="p-4 sm:p-8 bg-gray-50 min-h-screen">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center sm:text-left">
        NEWS
      </h2>

      {/* Responsive Table Wrapper */}
      <div className="overflow-x-auto">
        <table className="min-w-[800px] w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-purple-300">
            <tr>
              <th className="py-3 px-4 text-left text-gray-800 font-semibold">#</th>
              <th className="py-3 px-4 text-left text-gray-800 font-semibold">Image</th>
              <th className="py-3 px-4 text-left text-gray-800 font-semibold">Product Name</th>
              <th className="py-3 px-4 text-left text-gray-800 font-semibold">Description</th>
              <th className="py-3 px-4 text-left text-gray-800 font-semibold">Action</th>
            </tr>
          </thead>

          <tbody>
            {data.map((items, index) => (
              <tr key={items._id} className="border-b hover:bg-gray-100 transition">
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4">
                  <img
                    src={`http://localhost:7000/allImages/${items.prImage}`}
                    alt={items.name}
                    className="w-12 h-12 object-cover rounded-md"
                  />
                </td>
                <td className="py-3 px-4">{items.name}</td>
                <td className="py-3 px-4">{items.desc}</td>
                <td className="py-3 px-4 flex gap-3">
                  <Link  to={`/upnew/${items._id}`}>
                    <button className="text-green-500 bg-transparent hover:bg-purple-200 mt-2 text-xl">
                      <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                  </Link>
                  <button
                    className="text-red-500 bg-transparent hover:bg-purple-200 mt-2 text-xl"
                    onClick={() => handleDelete(items._id)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default News;
