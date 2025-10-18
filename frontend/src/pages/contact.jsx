import { useState } from "react";
import { motion, useScroll } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Footer from "../components/Footer";

export default function Contact() {
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const { scrollYProgress } = useScroll();

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;
    setComments([...comments, { id: Date.now(), name, text: comment }]);
    setName("");
    setComment("");
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { name, email, message } = formData;

    if (!name || !email || !message) {
      toast.error("Fadlan buuxi dhammaan meelaha faaruqa ah ❌");
      return;
    }

    try {
      const res = await axios.post("http://localhost:7000/Cabasho/add", formData);
      toast.success(res.data.message);
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      toast.error("Cabashada lama diiwaangelin. Fadlan isku day mar kale ❌");
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const commentVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen bg-gray-50 flex justify-center items-center p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full max-w-6xl">
          {/* Visit Center Info */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <img
              src="https://i.pinimg.com/474x/05/d1/b3/05d1b323eb3133ddf49e45ca19579821.jpg"
              alt="Center"
              className="w-full h-56 object-cover"
            />
            <div className="p-6 space-y-5">
              <h3 className="text-2xl font-bold text-gray-800">Visit Our Center</h3>

              <div className="flex items-center gap-4">
                <div className="bg-red-100 p-3 rounded-full">
                  <i className="fa-solid fa-map-marker-alt text-red-500 text-xl"></i>
                </div>
                <div>
                  <p className="font-semibold text-gray-700">Address</p>
                  <p className="text-gray-600">Hodan, Taleex</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <i className="fa-solid fa-phone text-green-500 text-xl"></i>
                </div>
                <div>
                  <p className="font-semibold text-gray-700">Phone</p>
                  <p className="text-gray-600">123-HOTEL</p>
                  <p className="text-gray-600">123-5437</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <i className="fa-solid fa-envelope text-blue-500 text-xl"></i>
                </div>
                <div>
                  <p className="font-semibold text-gray-700">Email</p>
                  <p className="text-gray-600">horyaal55@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-yellow-100 p-3 rounded-full">
                  <i className="fa-solid fa-clock text-yellow-500 text-xl"></i>
                </div>
                <div>
                  <p className="font-semibold text-gray-700">Hours</p>
                  <p className="text-gray-600">24hr</p>
                </div>
              </div>
            </div>
          </motion.div>

      <motion.form
  onSubmit={handleFormSubmit}
  initial={{ opacity: 0, x: 60 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8 }}
  className="bg-white p-10 rounded-2xl shadow-2xl max-w-3xl mx-auto flex flex-col items-center"
>
  {/* Sawirka kore */}
  <img
    src="https://images.pexels.com/photos/34253504/pexels-photo-34253504.jpeg"
    alt="Cabasho"
    className="w-full h-56 object-cover rounded-t-2xl mb-6"
  />

  {/* Cinwaan */}
  <h2 className="text-4xl font-extrabold mb-8 text-center text-gray-800">
    Cabasho
  </h2>

  {/* Input-yada form-ka */}
  <input
    type="text"
    name="name"
    placeholder="Enter your full name"
    value={formData.name}
    onChange={handleChange}
    className="w-full text-black p-4 border border-gray-300 rounded-xl shadow-sm 
               focus:outline-none focus:ring-2 focus:ring-pink-400 mb-6"
    required
  />

  <input
    type="email"
    name="email"
    placeholder="Enter your email address"
    value={formData.email}
    onChange={handleChange}
    className="w-full text-black p-4 border border-gray-300 rounded-xl shadow-sm 
               focus:outline-none focus:ring-2 focus:ring-pink-400 mb-6"
    required
  />

  <textarea
    name="message"
    placeholder="Write your message here..."
    value={formData.message}
    onChange={handleChange}
    rows="5"
    className="w-full text-black p-4 border border-gray-300 rounded-xl shadow-sm 
               focus:outline-none focus:ring-2 focus:ring-pink-400 mb-6 resize-none"
    required
  ></textarea>

  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    type="submit"
    className="w-full bg-gradient-to-r from-pink-500 to-green-400 text-white py-4 rounded-xl 
               font-semibold text-lg shadow-lg hover:opacity-90 transition duration-300"
  >
    Send Message
  </motion.button>
</motion.form>

        </div>
      </div>

      {/* Scroll Progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-purple-500 origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Comments */}
      <div className="container mx-auto p-8 mt-20">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Contact Us</h1>

        <form onSubmit={handleCommentSubmit} className="mb-8 flex flex-col gap-4">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <textarea
            placeholder="Write your comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            className="w-full p-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
          >
            Submit
          </button>
        </form>

        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Recent Reviews</h2>

        <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
          {comments.map((c) => (
            <motion.div
              key={c.id}
              variants={commentVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="p-4 border rounded-xl bg-gray-50 shadow hover:shadow-lg transition-shadow"
            >
              <h3 className="font-bold text-purple-600 text-lg">{c.name}</h3>
              <p className="text-gray-700 mt-1">{c.text}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}
