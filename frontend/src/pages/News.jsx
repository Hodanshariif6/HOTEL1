import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function News() {
  const [data, setData] = useState([]);

  // Fetch data
  const handleReadData = () => {
    axios
      .get("http://localhost:7000/read/New")
      .then((res) => setData(res.data))
      .catch((err) => console.error("Error fetching data:", err));
  };

  useEffect(() => {
    handleReadData();
  }, []);

  // Delete item
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this news item?")) return;

    axios
      .delete(`http://localhost:7000/delete/New/${id}`)
      .then(() => {
        alert("News deleted successfully");
        handleReadData();
      })
      .catch((err) => console.error("Error deleting:", err));
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gradient-to-br from-gray-100 via-white to-gray-200 min-h-screen">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center sm:text-left">
        📰 News List
      </h2>

      {/* TABLE VIEW (Tablet/Desktop) */}
      <div className="hidden md:block overflow-x-auto rounded-xl shadow-lg bg-white border border-gray-200">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gradient-to-r from-purple-300 to-pink-300">
            <tr>
              {["#", "Image", "Title", "Description", "Action"].map((head) => (
                <th
                  key={head}
                  className="py-3 px-4 text-left font-semibold text-gray-800 whitespace-nowrap"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.length > 0 ? (
              data.map((items, index) => (
                <tr
                  key={items._id}
                  className="border-b hover:bg-purple-50 transition duration-200"
                >
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">
                    <img
                      src={`http://localhost:7000/allImages/${items.prImage}`}
                      alt={items.name}
                      className="w-12 h-12 object-cover rounded-md border border-gray-300"
                    />
                  </td>
                  <td className="py-3 px-4 font-medium">{items.name}</td>
                  <td className="py-3 px-4 max-w-[300px] truncate">{items.desc}</td>
                  <td className="py-3 px-4 flex gap-3">
                    <Link to={`/upnew/${items._id}`}>
                      <button className="text-green-600 hover:text-green-700 bg-transparent hover:bg-green-100 p-2 rounded-md">
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(items._id)}
                      className="text-red-600 hover:text-red-700 bg-transparent hover:bg-red-100 p-2 rounded-md"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-6 text-gray-500 font-medium"
                >
                  No news found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* CARD VIEW (Mobile) */}
      <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
        {data.length > 0 ? (
          data.map((items, index) => (
            <div
              key={items._id}
              className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex flex-col"
            >
              <div className="flex items-center gap-4 mb-3">
                <img
                  src={`http://localhost:7000/allImages/${items.prImage}`}
                  alt={items.name}
                  className="w-16 h-16 object-cover rounded-lg border border-gray-300"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {items.name}
                  </h3>
                  <p className="text-sm text-gray-500">#{index + 1}</p>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-2 line-clamp-3">
                {items.desc}
              </p>

              <div className="flex justify-between items-center mt-auto">
                <div className="flex gap-3">
                  <Link to={`/upnew/${items._id}`}>
                    <button className="text-green-600 hover:text-green-700 text-lg">
                      <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(items._id)}
                    className="text-red-600 hover:text-red-700 text-lg"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No news found.</p>
        )}
      </div>

  
    </div>
  );
}

export default News;
