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
    return (
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
        <Footer/>
        </div>
    );
}

export default Home;
