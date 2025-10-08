import React, { useEffect, useState } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import img from "../img/about.png";
import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import Footer from "../components/Footer";

const faqData = [
  {
    question: "How can I book a room at your hotel?",
    answer: "You can easily book a room through our website or by contacting our reception directly.",
  },
  {
    question: "What time is check-in and check-out?",
    answer: "Check-in starts at 2:00 PM and check-out is by 12:00 PM noon.",
  },
  {
    question: "Do you offer airport shuttle services?",
    answer: "Yes, we offer 24/7 airport shuttle services for our guests upon request.",
  },
  {
    question: "Can I cancel or modify my booking?",
    answer: "Yes, you can modify or cancel your booking up to 24 hours before your arrival without extra charges.",
  },
];

function About() {
  const [news, setNews] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

  const fetchNews = async () => {
    try {
      const res = await axios.get("http://localhost:7000/read/New");
      setNews(res.data);
    } catch (error) {
      console.error("Failed to fetch news:", error);
    }
  };

  useEffect(() => {
    fetchNews();
    AOS.init({ duration: 1000, once: true });
  }, []);
   

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <div className="bg-gray-50 py-16 px-4">
        <div className="max-w-6xl mx-auto mb-16" data-aos="fade-right">
 <img className="w-[1800px] h-60 " src={img} alt="" />
          <h2 className="text-4xl font-bold text-purple-800 mb-4 mt-6">About Us</h2>
          <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
            Welcome to our hotel booking platform! We provide exceptional services and the latest updates
            about our hotels and special offers. Your comfort is our top priority.
          </p>
        </div>

        <h2
          className="text-3xl  font-bold text-gray-800 text-center mb-10"
          data-aos="fade-down"
        >
          Latest News
        </h2>

        <div className="grid gap-6  sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto ">
          {news.map((item, index) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <img
                src={`http://localhost:7000/allImages/${item.prImage}`}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-semibold text-red-500 mb-2">
                  {item.name}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row justify-center items-start gap-10 px-6 lg:px-20 py-16 bg-gray-100">
        
        <div className="bg-white shadow-2xl rounded-2xl w-full lg:w-1/2 max-h-[400px] overflow-y-auto p-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className="border-b border-gray-200 pb-2 cursor-pointer"
              >
                <div
                  className="flex justify-between items-center"
                  onClick={() => toggleFAQ(index)}
                >
                  <h3 className="text-lg font-medium text-gray-700">
                    {faq.question}
                  </h3>
                  {openIndex === index ? (
                    <Minus className="text-purple-600" />
                  ) : (
                    <Plus className="text-purple-600" />
                  )}
                </div>

                {openIndex === index && (
                  <motion.div
                    initial={{ rotateX: -90, opacity: 0 }}
                    animate={{ rotateX: 0, opacity: 1 }}
                    exit={{ rotateX: 90, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mt-2 text-gray-600 bg-gray-50 p-3 rounded-lg shadow-inner"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white shadow-2xl rounded-2xl w-full lg:w-1/2 p-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Our Location
          </h2>
          <iframe
            title="Hotel Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.2075270839787!2d39.27605507479324!3d9.56666888141383!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x16250a6e80e3c2e5%3A0x38f00c8e9e1c42b1!2sHotel!5e0!3m2!1sen!2sso!4v1634109379230!5m2!1sen!2sso"
            width="100%"
            height="350"
            allowFullScreen=""
            loading="lazy"
            className="rounded-lg"
          ></iframe>
          <p className="text-gray-600 text-center mt-4">
            Visit us at our hotel location for a warm welcome and premium services.
          </p>
        </div>
      </div>







<section class="hotel-booking">
  <div class="container">
    <div class="im1" data-aos="fade-right">
  <img src="https://i.pinimg.com/1200x/b1/d1/4a/b1d14a1db18009d61ee8600705368c0c.jpg" alt="Horyaal Hotel Room"/>
    </div>

    <div class="im2" data-aos="fade-left" data-aos-delay="200">
         <img className="w-10" src="https://i.pinimg.com/1200x/bf/78/72/bf787252064a2bff820a3de5a734886d.jpg" alt="Horyaal Hotel Lobby"/>
</div>
    <div class="te" data-aos="fade-up" data-aos-delay="400">
      <h1>Welcome to <span>Horyaal Hotel</span></h1>
      <hr/>
      <p>
        Experience luxury and comfort like never before. At Horyaal Hotel, we ensure every guest enjoys world-class service, elegant rooms, and unforgettable experiences.
      </p>
      <p>
        Whether for leisure, business, or special events, Horyaal Hotel is your ultimate destination for a perfect stay.
      </p>
    </div>
  </div>
</section>

      <Footer/>
    </>
  );
}

export default About;
