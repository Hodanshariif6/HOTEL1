import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useMemo } from "react";
import img7 from '../img/img7.jpg'
import img8 from '../img/img8.jpg'
import img9 from '../img/img9.jpg'
import img10 from '../img/img10.jpg'
import img11 from '../img/img11.jpg'
import Room from "../components/RoomView";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import hotelvideo from '../assets/video/hotel.mp4';
const initialItems = [
  {
    id: "horyaalhotel1",
    intro: {
      title: "WELCOM",
      topic: "HORYAAL HOTEL",
      des: "qeebtaan waa qeebta nasiinada iyo swimming pools...",
    },
    detail: {
      title: "HORYAAL HOTEL",
      des: "qeebtaan waa qeebta nasiinada iyo swimming pools view xeebta qurux badan oo cafimaad leh",
      specs: [
        ["Used time", "waqti walbo"],
        ["Beautiful", "view xeebta"],
        ["free", "one coffee"],
        ["swimming pool", "only day"],
      ],
    },
  img: img7,
    
     
    
  },
  {
    id: "horyaalhotel2",
    intro: {
      title: "WELCOM",
      topic: "HORYAAL HOTEL",
      des: "qeebta buuraha u dhaw...",
    },
    detail: {
      title: "HORYAAL HOTEL",
      des: "qeebta buuraha u dhaw wuxu leyahay view aad u qurux badan",
      specs: [
        ["Beautiful", "view buuraha"],
        ["free", "one coffee"],
        ["swimming pool", "only day"],
      ],
    },
  img: img8,
  },
  {
    id: "horyaalhotel3",
    intro: {
      title: "WELCOM",
      topic: "HORYAAL HOTEL",
      des: "qeebtaan waa qeebta vip...",
    },
    detail: {
      title: "HORYAAL HOTEL",
      des: "qeebtaan waa qeebta vip waxe ledahay qeebta holalka waweyn",
      specs: [
       ["Used time", "waqti walbo"],
        ["Beautiful", "view xeebta"],
        ["free", "one coffee"],
        ["swimming pool", "only day"],
      ],
    },
  img: img9,
  },
  {
    id: "horyaalhotel4",
    intro: {
      title: "WELCOM",
      topic: "HORYAAL HOTEL",
      des: "qeebtaan waa qeebta shirarka...",
    },
    detail: {
      title: "HORYAAL HOTEL",
      des: "qeebtaan waa qeebta shirarka oo vip eh cutada waa free",
      specs: [
   ["Used time", "waqti walbo"],
        ["free", "food"],
      ],
    },
  img: img10,
  },
  {
    id: "horyhotel5",
    intro: {
      title: "WELCOM",
      topic: "HORYAAL HOTEL",
      des: "qeebtaan waa qebaha qololka...",
    },
    detail: { 
       
      title: "Barrier Balm",
      des: "qeebtaan waa qebaha qololka 2qof logu tala galay view qurxan wuu leyahay",
      specs: [
        ["Beautiful", "view"],
        ["free", "one coffee"],
        ["swimming pool", "only day"],
      ],
    },
    img: img11,
     
  },
];
function Home() {
      const [items, setItems] = useState(initialItems);
  const [isDetail, setIsDetail] = useState(false);
  const carouselRef = useRef(null);
  const backBtnRef = useRef(null);
  const autoTimerRef = useRef(null);

  const activeIndex = 1; 
  const activeItem = useMemo(() => items[activeIndex] ?? items,[], [items]);

  const showNext = () => {
    setItems((prev) => {
      const copy = [...prev];
      const first = copy.shift();
      if (first) copy.push(first);
      return copy;
    });
    toggleEffectClass("next");
  };

  const showPrev = () => {
    setItems((prev) => {
      const copy = [...prev];
      const last = copy.pop();
      if (last) copy.unshift(last);
      return copy;
    });
    toggleEffectClass("prev");
  };




  const toggleEffectClass = (cls) => {
    const el = carouselRef.current;
    if (!el) return;
    el.classList.add(cls);
    window.clearTimeout(el.__t);
    el.__t = window.setTimeout(() => {
      el.classList.remove("next");
      el.classList.remove("prev");
    }, 700);
  };

  const openDetail = () => {
    setIsDetail(true);
    requestAnimationFrame(() => backBtnRef.current?.focus());
  };

  const closeDetail = () => {
    setIsDetail(false);
  };

  useEffect(() => {
    const start = () => {
      stop();
      autoTimerRef.current = window.setInterval(() => {
        if (!isDetail) showNext();
      }, 5000);
    };
    const stop = () => {
      if (autoTimerRef.current) {
        clearInterval(autoTimerRef.current);
        autoTimerRef.current = null;
      }
    };
    start();
    return stop;
  }, [isDetail]); 

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    const stop = () => {
      if (autoTimerRef.current) {
        clearInterval(autoTimerRef.current);
        autoTimerRef.current = null;
      }
    };
    const resume = () => {
      if (!autoTimerRef.current) {
        autoTimerRef.current = window.setInterval(() => {
          if (!isDetail) showNext();
        }, 5000);
      }
    };
    el.addEventListener("mouseenter", stop);
    el.addEventListener("mouseleave", resume);
    return () => {
      el.removeEventListener("mouseenter", stop);
      el.removeEventListener("mouseleave", resume);
    };
  }, [isDetail]);

  useEffect(() => {
    const onKey = (e) => {
      if (isDetail) {
        if (e.key === "Escape") {
          e.preventDefault();
          closeDetail();
        }
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        showNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        showPrev();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isDetail]);
  
  const [showModal, setShowModal] = useState(false);
const [selectedProduct, setSelectedProduct] = useState(null);
const handleOpenModal = (product) => {
  setSelectedProduct(product);
  setShowModal(true);
};

const handleCloseModal = () => {
  setShowModal(false);
  setSelectedProduct(null);
};
    return (<>
        <div>

         <section
      ref={carouselRef}
      className={ `  carousel${isDetail ? " showDetail" : ""}`}
      role="region"
      aria-label="Skin Care Carousel"
    >
      <div className="list" aria-live="polite">
        {items.map((it) => (
          <article key={it.id} className="item">
            <div className="intro">
              <div className="title">{it.intro.title}</div>
              <div className="topic">{it.intro.topic}</div>
              <div className="des">{it.intro.des}</div>
              <button
                className="seeMore"
                type="button"
                aria-label={`See more about ${it.intro.topic}`}
                onClick={openDetail}
              >
                see more ↗
              </button>
            </div>

            <div className="detail" aria-hidden={!isDetail || activeItem?.id !== it.id}>
              <div className="title">{it.detail.title}</div>
              <div className="des">{it.detail.des}</div>
              <div className="specifications" role="list">
                {it.detail.specs.map(([k, v], idx) => (
                  <div role="listitem" key={idx}>
                    <p>{k}</p>
                    <p>{v}</p>
                  </div>
                ))}
              </div>
             
            </div>

            <div className="img">
              <img src={it.img}  />
            </div>
          </article>
        ))}
      </div>

      <div className="arrows">
        <button id="prev" type="button" aria-label="Previous slide" title="Previous" onClick={showPrev}>
          &lt;
        </button>
        <button
          id="back"
          ref={backBtnRef}
          type="button"
          aria-label="Go back from details"
          title="Go Back"
          onClick={closeDetail}
          style={{ opacity: isDetail ? 1 : 0, pointerEvents: isDetail ? "auto" : "none" }}
        >
          GO BACK ↗
        </button>
        <button id="next" type="button" aria-label="Next slide" title="Next" onClick={showNext}>
          &gt;
        </button>
      </div>
    </section>
        <Room/>
        
 {showModal && selectedProduct && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-[90%] md:w-[500px] rounded-lg shadow-lg p-6 relative">
        <button
          onClick={handleCloseModal}
          className="absolute top-2 right-2 text-white bg-purple-400 hover:bg-purple-500 hover:text-white text-xl"
        >
          &times;
        </button>

        <h2 className="text-xl font-bold mb-4 text-gray-800">
          {selectedProduct.name}
        </h2>

        <img
          src={`http://localhost:7000/allImages/${selectedProduct.prImage}`}
          alt={selectedProduct.name}
          className="w-full h-40 object-cover rounded mb-4"
        />

        <p className="text-sm text-gray-600 mb-2"><strong>Category:</strong> {selectedProduct.category}</p>
        <p className="text-sm text-gray-600 mb-2"><strong>Price:</strong> ${selectedProduct.price}</p>
        <p className="text-sm text-gray-600 mb-2"><strong>Short Description:</strong> {selectedProduct.desc}</p>
        <p className="text-sm text-gray-600"><strong>Detail:</strong><br /> {selectedProduct.detail}</p>
      </div>
    </div>
  )}
</div>





      {/* ========== GALLERY SECTION ========== */}
      <section id="gallery" className="sm:pl-[80px] py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Title */}
          <h2
            data-aos="fade-up"
            className="font-bold text-center text-4xl text-gray-800"
          >
            Our Beautiful Hotel Gallery
          </h2>
          <p
            data-aos="fade-up"
            data-aos-delay="200"
            className="gallery-subtitle text-center text-gray-600 mt-4"
          >
            Discover the elegance of our hotel rooms, pools, and luxurious spaces
          </p>

          {/* Gallery Grid */}
          <div className="gallery-grid mt-12">
            {/* Large Featured Image */}
            <div className="gallery-item large" data-aos="zoom-in">
              <img
                src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Luxury Pool Area"
                className="object-cover w-full h-full"
              />
              <div className="gallery-overlay">
                <h4>SWIMMING POOL</h4>
                <p className="text-gray-300">
                  Relax and refresh with our luxury pool
                </p>
              </div>
            </div>

            {/* Standard Images */}
            <div
              className="gallery-item"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Deluxe Hotel Room"
                className="object-cover w-full h-full"
              />
              <div className="gallery-overlay">
                <h4>DELUXE ROOM</h4>
                <p className="text-gray-300">Comfort and luxury combined</p>
              </div>
            </div>

            <div
              className="gallery-item"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <img
                src="https://i.pinimg.com/1200x/58/8d/dc/588ddc3680336379944d5f05f319460d.jpg"
                alt="Sea View Room"
                className="object-cover w-full h-full"
              />
              <div className="gallery-overlay">
                <h4>SEA VIEW</h4>
                <p className="text-gray-300">Rooms with stunning ocean views</p>
              </div>
            </div>

            <div
              className="gallery-item"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <img
                src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Conference Hall"
                className="object-cover w-full h-full"
              />
              <div className="gallery-overlay">
                <h4>CONFERENCE HALL</h4>
                <p className="text-gray-300">Spacious halls for your events</p>
              </div>
            </div>

            <div
              className="gallery-item"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <img
                src="https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Fine Dining"
                className="object-cover w-full h-full"
              />
              <div className="gallery-overlay">
                <h4>FINE DINING</h4>
                <p className="text-gray-300">
                  Delicious meals prepared by top chefs
                </p>
              </div>
            </div>

            {/* Tall Image */}
            <div
              className="gallery-item tall"
              data-aos="zoom-in"
              data-aos-delay="500"
            >
              <img
                src="https://i.pinimg.com/736x/91/26/7f/91267f7c0d820b7abbeab9bda4993178.jpg"
                alt="Spa and Relaxation"
                className="object-cover w-full h-full"
              />
              <div className="gallery-overlay">
                <h4>SPA CENTER</h4>
                <p>Unwind with our premium spa services</p>
              </div>
            </div>
          </div>
        </div>
      </section>







    {/* <HotelFacilities/> */}


 <section className="relative w-full min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-7xl mx-auto px-6 py-12 gap-8">
        
        {/* Left: Video */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="relative w-full md:w-72 h-[300px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={hotelvideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/20"></div>

          
        </motion.div>

        {/* Right: Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="w-full md:w-1/2 text-center md:text-left"
        >
          <h2
            className="text-3xl md:text-5xl font-bold text-gray-800 mb-6"
            data-aos="fade-up"
          >
            Welcome to <span className="text-purple-600">Horyaal Hotel</span>
          </h2>

          <p
            className="text-gray-600 text-lg leading-relaxed mb-8"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Experience a world of elegance and comfort at our luxury hotel.
            Enjoy breathtaking views, world-class service, and unforgettable
            moments. Whether you're here for leisure, business, or events, we
            ensure your stay is nothing short of perfect.
          </p>

          {/* Features in grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            {[
              {
                title: "🏨 Deluxe Rooms",
                desc: "Our rooms are designed to provide ultimate comfort with king-sized beds, modern interiors, and stunning views.",
              },
              {
                title: "🍽 Fine Dining",
                desc: "Savor world-class dishes crafted by our expert chefs, offering a variety of cuisines in a beautiful atmosphere.",
              },
              {
                title: "💆 Spa & Wellness",
                desc: "Relax and rejuvenate with our premium spa treatments, including massages, saunas, and more.",
              },
              {
                title: "🎉 Events & Conferences",
                desc: "Host your weddings, events, or conferences in our spacious and modern event halls.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white shadow-lg rounded-lg p-5 hover:shadow-2xl transition transform hover:-translate-y-2"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>

          
        </motion.div>
      </div>
    </section>
        <Footer/>
        
   </> );
}

export default Home;
