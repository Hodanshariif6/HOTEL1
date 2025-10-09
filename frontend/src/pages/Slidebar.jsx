import axios from "axios";
import { useEffect, useState } from "react";

function Slidebar() {
  const [totalIncome, setTotalIncome] = useState(0);
  const [topCustomers, setTopCustomers] = useState([]);
  const [orders, setOrders] = useState([]);

  // Load data from backend
  const fetchData = async () => {
    try {
      const incomeRes = await axios.get("http://localhost:7000/getIncome/order");
      setTotalIncome(incomeRes.data?.[0]?.totalIncome || 0);

      const topCustRes = await axios.get("http://localhost:7000/getTopCustomer/order");
      setTopCustomers(topCustRes.data || []);

      const ordersRes = await axios.get("http://localhost:7000/read/order");
      setOrders(ordersRes.data || []);
    } catch (err) {
      console.error("Failed to fetch data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Delete order function
  const handleDeleteOrder = async (orderId) => {
    const order = orders.find((o) => o._id === orderId);
    if (!order) return;

    // Show confirm dialog with customer info
    const confirmDelete = window.confirm(
      `Are you sure you want to delete this order?\n\nCustomer Info:\nName: ${order.customer.name}\nEmail: ${order.customer.email}\nPhone: ${order.customer.phone}`
    );
    if (!confirmDelete) return;

    try {
      // Delete from backend
      await axios.delete(`http://localhost:7000/delete/order/${orderId}`);
      alert("✅ Order deleted successfully");

      // Update orders state
      setOrders((prevOrders) => prevOrders.filter((o) => o._id !== orderId));

      // Update summary cards
      setTotalIncome((prev) => prev - (order.TotalAmount || 0));
      setTopCustomers((prev) =>
        prev.filter((c) => c._id !== order.customer.email)
      );
    } catch (err) {
      console.error(err);
      alert("❌ Failed to delete order");
    }
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-6 text-center">📊 Admin Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-6 bg-purple-600 rounded-xl text-white text-center shadow-md">
          <h2 className="text-lg font-semibold">Total Income</h2>
          <p className="text-3xl font-bold">${totalIncome}</p>
        </div>
        <div className="p-6 bg-purple-600 rounded-xl text-white text-center shadow-md">
          <h2 className="text-lg font-semibold">Total Orders</h2>
          <p className="text-3xl font-bold">{orders.length}</p>
        </div>
        <div className="p-6 bg-purple-600 rounded-xl text-white text-center shadow-md">
          <h2 className="text-lg font-semibold">Top Customers</h2>
          <p className="text-3xl font-bold">{topCustomers.length}</p>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white shadow-md rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">All Room Orders</h2>
        <table className="w-full border-collapse border text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2">Customer Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">Room Image</th>
              <th className="border p-2">Room Name</th>
              <th className="border p-2">Qty</th>
              <th className="border p-2">Nights</th>
              <th className="border p-2">Total</th>
              <th className="border p-2">Check-in</th>
              <th className="border p-2">Check-out</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o, i) =>
              o.rooms.map((r, j) => (
                <tr key={`${i}-${j}`} className="text-center border-t hover:bg-gray-50">
                  <td className="border p-2">{o.customer.name}</td>
                  <td className="border p-2">{o.customer.email}</td>
                  <td className="border p-2">{o.customer.phone}</td>
                  <td className="border p-2">
                    <img
                      src={`http://localhost:7000/allImages/${r.prImage?.trim()}`}
                      alt={r.name}
                      className="w-20 h-16 object-cover rounded-md mx-auto shadow-sm"
                    />
                  </td>
                  <td className="border p-2">{r.name}</td>
                  <td className="border p-2">{r.quantity}</td>
                  <td className="border p-2">{r.nights}</td>
                  <td className="border p-2 font-semibold text-green-700">${r.total}</td>
                  <td className="border p-2">{new Date(o.checkIn).toLocaleDateString()}</td>
                  <td className="border p-2">{new Date(o.checkOut).toLocaleDateString()}</td>
                  <td className="border p-2">
                    <button
                      onClick={() => handleDeleteOrder(o._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Slidebar;
