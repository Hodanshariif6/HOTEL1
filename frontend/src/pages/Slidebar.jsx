import axios from "axios";
import { useEffect, useState } from "react";

function Slidebar() {
  const [totalIncome, setTotalIncome] = useState(0);
  const [topCustomers, setTopCustomers] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:7000/getIncome/order").then((res) => {
      setTotalIncome(res.data?.[0]?.totalIncome || 0);
    });
    axios.get("http://localhost:7000/getTopCustomer/order").then((res) => {
      setTopCustomers(res.data || []);
    });
    axios.get("http://localhost:7000/read/order").then((res) => {
      setOrders(res.data || []);
    });
  }, []);

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-6 text-center">📊 Admin Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white text-center">
          <h2 className="text-lg font-semibold">Total Income</h2>
          <p className="text-3xl font-bold">${totalIncome}</p>
        </div>

        <div className="p-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white text-center">
          <h2 className="text-lg font-semibold">Total Orders</h2>
          <p className="text-3xl font-bold">{orders.length}</p>
        </div>

        <div className="p-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white text-center">
          <h2 className="text-lg font-semibold">Top Customers</h2>
          <p className="text-3xl font-bold">{topCustomers.length}</p>
        </div>
      </div>

      {/* Top Customers Table */}
      <div className="bg-white shadow-md rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Top Customers</h2>
        <table className="w-full border-collapse border text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">Orders</th>
              <th className="border p-2">Total Spent</th>
            </tr>
          </thead>
          <tbody>
            {topCustomers.map((c, i) => (
              <tr key={i} className="text-center border-t">
                <td className="border p-2">{c.name}</td>
                <td className="border p-2 text-black">{c.email}</td>
                <td className="border p-2">{c.phone}</td>
                <td className="border p-2">{c.totalOrders}</td>
                <td className="border p-2 font-semibold">${c.totalSpent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* All Orders Table with Check-in / Check-out */}
      <div className="bg-white shadow-md rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">All Room Orders</h2>
        <table className="w-full border-collapse border text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2">Customer</th>
              <th className="border p-2">Room Name</th>
              <th className="border p-2">Image</th>
              <th className="border p-2">Qty</th>
              <th className="border p-2">Nights</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Total</th>
              <th className="border p-2">Check-in</th>
              <th className="border p-2">Check-out</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o, i) =>
              o.rooms.map((r, j) => (
                <tr key={`${i}-${j}`} className="border-t text-center">
                  <td className="border p-2">{o.customer.name}</td>
                  <td className="border p-2">{r.name}</td>
                  <td className="border p-2">
                    <img
                      src={`http://localhost:7000/allImages/${r.prImage}`}
                      alt={r.name}
                      className="w-16 h-12 object-cover mx-auto rounded"
                    />
                  </td>
                  <td className="border p-2">{r.quantity}</td>
                  <td className="border p-2">{r.nights}</td>
                  <td className="border p-2">${r.price}</td>
                  <td className="border p-2 font-semibold">${r.total}</td>
                  <td className="border p-2">{new Date(o.checkIn).toLocaleDateString()}</td>
                  <td className="border p-2">{new Date(o.checkOut).toLocaleDateString()}</td>
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
