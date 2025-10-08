import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Room() {
  const [data, setData] = useState([]);

  const handleReadData = () => {
    axios
      .post("http://localhost:7000/read/Room")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  };

  useEffect(() => {
    handleReadData();
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:7000/delete/Room/${id}`)
      .then(() => {
        alert("Success delete");
        handleReadData();
      })
      .catch((err) => {
        console.error("Error deleting:", err);
      });
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Room List</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-purple-300">
            <tr>
              <th className="py-3 px-4 text-left text-gray-800 font-semibold">
                #
              </th>
              <th className="py-3 px-4 text-left text-gray-800 font-semibold">
                Image
              </th>
              <th className="py-3 px-4 text-left text-gray-800 font-semibold">
                Room Name
              </th>
              <th className="py-3 px-4 text-left text-gray-800 font-semibold">
                Quantity
              </th>
              <th className="py-3 px-4 text-left text-gray-800 font-semibold">
                Price
              </th>
              <th className="py-3 px-4 text-left text-gray-800 font-semibold">
                Description
              </th>
              <th className="py-3 px-4 text-left text-gray-800 font-semibold">
                Status
              </th>
              <th className="py-3 px-4 text-left text-gray-800 font-semibold">
                Action
              </th>
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
                <td className="py-3 px-4">{items.quantity}</td>
                <td className="py-3 px-4">${items.price}</td>
                <td className="py-3 px-4">{items.desc}</td>
                <td className="py-3 px-4">
                  <span
                    className={`${
                      items.status === "Available"
                        ? "text-green-600"
                        : "text-red-500"
                    } font-semibold`}
                  >
                    {items.status}
                  </span>
                </td>
                <td className="py-3 px-4 flex gap-3">
                  <Link to={`/updateRoom/${items._id}`}>
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

export default Room;
