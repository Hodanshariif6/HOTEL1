import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Room() {
  const [data, setData] = useState([]);

  const handleReadData = () => {
    axios
      .post("http://localhost:7000/read/Room")
      .then((res) => setData(res.data))
      .catch((err) => console.error("Error fetching data:", err));
  };

  useEffect(() => {
    handleReadData();
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this room?")) return;

    axios
      .delete(`http://localhost:7000/delete/Room/${id}`)
      .then(() => {
        alert("Room deleted successfully");
        handleReadData();
      })
      .catch((err) => console.error("Error deleting:", err));
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gradient-to-br from-gray-100 via-white to-gray-200 min-h-screen">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center sm:text-left">
        🏠 Room List
      </h2>

      {/* TABLE VIEW - For md and above */}
      <div className="hidden md:block overflow-x-auto rounded-xl shadow-lg bg-white border border-gray-200">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gradient-to-r from-purple-300 to-pink-300">
            <tr>
              {[
                "#",
                "Image",
                "Room Name",
                "Quantity",
                "Price",
                "Description",
                "Status",
                "Action",
              ].map((head) => (
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
                  <td className="py-3 px-4">{items.quantity}</td>
                  <td className="py-3 px-4">${items.price}</td>
                  <td className="py-3 px-4 max-w-[250px] truncate">
                    {items.desc}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`${
                        items.status === "Available"
                          ? "text-green-600 bg-green-100"
                          : "text-red-600 bg-red-100"
                      } font-semibold text-xs px-2 py-1 rounded-lg`}
                    >
                      {items.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 flex gap-3">
                    <Link to={`/updateRoom/${items._id}`}>
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
                  colSpan="8"
                  className="text-center py-6 text-gray-500 font-medium"
                >
                  No rooms found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* CARD VIEW - For mobile screens */}
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
                  <p className="text-sm text-gray-500">
                    Quantity: {items.quantity}
                  </p>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                {items.desc}
              </p>

              <div className="flex justify-between items-center mt-auto">
                <span
                  className={`${
                    items.status === "Available"
                      ? "text-green-600 bg-green-100"
                      : "text-red-600 bg-red-100"
                  } text-xs px-2 py-1 rounded-lg font-semibold`}
                >
                  {items.status}
                </span>

                <div className="flex gap-3">
                  <Link to={`/updateRoom/${items._id}`}>
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

              <p className="mt-2 font-medium text-purple-700">
                💲{items.price}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No rooms found.
          </p>
        )}
      </div>

    
    </div>
  );
}

export default Room;
