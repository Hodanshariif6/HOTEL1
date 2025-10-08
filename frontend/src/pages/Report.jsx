// import axios from "axios";
// import { useEffect, useState, useRef } from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
//   CartesianGrid,
//   ResponsiveContainer,
//   BarChart,
//   Bar
// } from "recharts";
// import { jsPDF } from "jspdf";
// import html2canvas from "html2canvas";

// function Report() {
//   const [roomData, setRoomData] = useState([]);
//   const [newsData, setNewsData] = useState([]);
//   const reportRef = useRef();

//   const generatePDF = () => {
//     const input = reportRef.current;
//     html2canvas(input, { scale: 2 }).then((canvas) => {
//       const imgData = canvas.toDataURL("image/png");
//       const pdf = new jsPDF("p", "mm", "a4");
//       const imgProps = pdf.getImageProperties(imgData);
//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

//       pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
//       pdf.save("Hotel_Booking_System_Report.pdf");
//     });
//   };

//   const fetchData = async () => {
//     try {
//       const resRooms = await axios.get("https://hotel-1-kdj9.onrender.com/read/product");
//       setRoomData(resRooms.data);

//       const resNews = await axios.get("https://hotel-1-kdj9.onrender.com/read/New");
//       setNewsData(resNews.data);
//     } catch (err) {
//       console.error("Error fetching:", err);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // Sample chart data
//   const chartData = [
//     { date: "06/07", Rooms: 10, News: 3 },
//     { date: "07/07", Rooms: 25, News: 5 },
//     { date: "08/07", Rooms: 20, News: 7 },
//     { date: "09/07", Rooms: 28, News: 4 },
//     { date: "10/07", Rooms: 15, News: 6 },
//     { date: "11/07", Rooms: 22, News: 8 },
//     { date: "12/07", Rooms: 40, News: 9 },
//   ];

//   const totalData = [
//     { name: "Rooms", total: roomData.length },
//     { name: "News", total: newsData.length }
//   ];

//   return (
//     <div className="p-4">
//       <div ref={reportRef} className="bg-white p-4 rounded shadow">
//         <h1 className="text-2xl font-bold mb-4">Hotel Booking System Report</h1>

//         {/* Line Chart for historical data */}
//         <div className="mb-6">
//           <h2 className="font-semibold mb-2">Rooms & News Overview</h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <LineChart data={chartData}>
//               <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
//               <XAxis dataKey="date" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Line type="monotone" dataKey="Rooms" stroke="#22c55e" strokeWidth={3} />
//               <Line type="monotone" dataKey="News" stroke="#3b82f6" strokeWidth={3} />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Bar Chart for totals */}
//         <div>
//           <h2 className="font-semibold mb-2">Total Rooms & News</h2>
//           <ResponsiveContainer width="100%" height={250}>
//             <BarChart data={totalData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="total" fill="#f97316" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       <button
//         onClick={generatePDF}
//         className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//       >
//         Download PDF
//       </button>
//     </div>
//   );
// }

// export default Report;
