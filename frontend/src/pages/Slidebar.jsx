import axios from "axios";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

// Sparkline small graph
function Sparkline({ points = [], className = "" }) {
  if (!points || points.length === 0) return null;
  const width = 100;
  const height = 28;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const span = max - min || 1;
  const step = width / (points.length - 1);
  const pathD = points
    .map((p, i) => {
      const x = i * step;
      const y = height - ((p - min) / span) * height;
      return `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
    >
      <path
        d={pathD}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export default function Slidebar() {
  const [totalIncome, setTotalIncome] = useState(0);
  const [topCustomers, setTopCustomers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const incomeRes = await axios.get("http://localhost:7000/getIncome/order");
        setTotalIncome(incomeRes.data?.[0]?.totalIncome || 0);

        const topCustRes = await axios.get("http://localhost:7000/getTopCustomer/order");
        setTopCustomers(topCustRes.data || []);

        const ordersRes = await axios.get("http://localhost:7000/read/order");
        const data = ordersRes.data || [];
        setOrders(data);

        const now = new Date();
        const currentMonth = now.getMonth();
        const monthOrders = data.filter(
          (o) => new Date(o.checkIn).getMonth() === currentMonth
        );

        const incomeByDay = {};
        monthOrders.forEach((order) => {
          order.rooms.forEach((r) => {
            const day = new Date(order.checkIn).getDate();
            incomeByDay[day] = (incomeByDay[day] || 0) + (r.total || 0);
          });
        });

        const formatted = Array.from({ length: now.getDate() }, (_, i) => ({
          day: `Day ${i + 1}`,
          income: incomeByDay[i + 1] || 0,
        }));
        setMonthlyData(formatted);
      } catch (err) {
        console.error("❌ Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  const incomeTrend = monthlyData.map((d) => d.income);
  const ordersTrend = [3, 5, 9, 11, orders.length];
  const customersTrend = [2, 3, 5, 6, topCustomers.length];

  const handleDeleteOrder = async (orderId) => {
    const order = orders.find((o) => o._id === orderId);
    if (!order) return;
    if (!window.confirm(`Delete order for ${order.customer.name}?`)) return;
    try {
      await axios.delete(`http://localhost:7000/delete/order/${orderId}`);
      setOrders((prev) => prev.filter((o) => o._id !== orderId));
      setTotalIncome((prev) => prev - (order.TotalAmount || 0));
    } catch (err) {
      console.error("❌ Delete failed:", err);
    }
  };

  const cardBase =
    "relative backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300";

  return (
    <div className="p-4 sm:p-6 md:p-8 w-80 sm:w-full  space-y-10 bg-gradient-to-br from-gray-900 via-gray-800 to-black min-h-screen text-white font-inter">
      {/* 🔹 Header */}
      <div className="text-center space-y-1">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent"
        >
          Admin Dashboard
        </motion.h1>
      </div>

      {/* 🌈 Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {/* Income */}
        <motion.div whileHover={{ scale: 1.03 }} className={cardBase}>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <p className="uppercase text-xs text-gray-300">Total Income</p>
              <h2 className="text-2xl sm:text-3xl font-bold mt-1 text-fuchsia-400">
                ${totalIncome}
              </h2>
              <p className="text-xs opacity-70 italic mt-1">This month</p>
            </div>
            <div className="text-2xl sm:text-3xl">💰</div>
          </div>
          <Sparkline points={incomeTrend} className="text-fuchsia-400 mt-3" />
        </motion.div>

        {/* Orders */}
        <motion.div whileHover={{ scale: 1.03 }} className={cardBase}>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <p className="uppercase text-xs text-gray-300">Total Orders</p>
              <h2 className="text-2xl sm:text-3xl font-bold mt-1 text-indigo-400">
                {orders.length}
              </h2>
            </div>
            <div className="text-2xl sm:text-3xl">🛒</div>
          </div>
          <Sparkline points={ordersTrend} className="text-indigo-400 mt-3" />
        </motion.div>

        {/* Customers */}
        <motion.div whileHover={{ scale: 1.03 }} className={cardBase}>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <p className="uppercase text-xs text-gray-300">Top Customers</p>
              <h2 className="text-2xl sm:text-3xl font-bold mt-1 text-emerald-400">
                {topCustomers.length}
              </h2>
            </div>
            <div className="text-2xl sm:text-3xl">👥</div>
          </div>
          <Sparkline points={customersTrend} className="text-emerald-400 mt-3" />
        </motion.div>
      </div>

      {/* 📊 Chart */}
      <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 text-white">
          📈 Monthly Income Trend
        </h2>
        <div className="h-56 sm:h-72 md:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="day" stroke="#ccc" tick={{ fontSize: 10 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#111",
                  border: "1px solid #444",
                  color: "#fff",
                }}
              />
              <Line
                type="monotone"
                dataKey="income"
                stroke="#c084fc"
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 🧾 Orders Table */}
      <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4 text-white flex items-center gap-2">
          🧾 All Orders
        </h2>
        <table className="min-w-[600px] sm:min-w-full text-xs sm:text-sm text-gray-300">
          <thead className="bg-white/10 text-gray-200 uppercase text-[10px] sm:text-xs">
            <tr>
              {[
                "Customer",
                "Email",
                "Phone",
                "Room",
                "Qty",
                "Nights",
                "Total",
                "Check-in",
                "Check-out",
                "Action",
              ].map((th) => (
                <th key={th} className="p-2 sm:p-3 border-b border-white/10 whitespace-nowrap">
                  {th}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map((o, i) =>
              o.rooms.map((r, j) => (
                <tr
                  key={`${i}-${j}`}
                  className="text-center hover:bg-white/10 transition"
                >
                  <td className="p-2">{o.customer.name}</td>
                  <td className="p-2">{o.customer.email}</td>
                  <td className="p-2">{o.customer.phone}</td>
                  <td className="p-2">
                    <img
                      src={`http://localhost:7000/allImages/${r.prImage?.trim()}`}
                      alt={r.name}
                      className="w-16 h-12 sm:w-20 sm:h-16 object-cover rounded-lg mx-auto border border-gray-600"
                    />
                    <p>{r.name}</p>
                  </td>
                  <td>{r.quantity}</td>
                  <td>{r.nights}</td>
                  <td className="font-semibold text-green-400">${r.total}</td>
                  <td>{new Date(o.checkIn).toLocaleDateString()}</td>
                  <td>{new Date(o.checkOut).toLocaleDateString()}</td>
                  <td>
                    <button
                      onClick={() => handleDeleteOrder(o._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded-lg text-xs"
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
