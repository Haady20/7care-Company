import { useState } from "react";
import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./LandingPage.css";
import Footer from "../components/Footer.jsx";
import About from "../components/About.jsx";

const FEATURES = [
  {
    id: 1,
    title: "عنوان الميزة الأولى",
    short: "وصف مختصر للميزة الأولى في جملة أو سطرين.",
    detailTitle: "عنوان تفصيلي للميزة الأولى",
    detailText:
      "هنا هنشرح بالتفصيل الميزة الأولى: إزاي بتفيد العميل، إزاي الشركة بتطبقها، وأي أرقام أو أمثلة تحب تضيفها لاحقًا.",
    imagePosition: "right",
    image: "/images/img4.jpg",
  },
  {
    id: 2,
    title: "عنوان الميزة الثانية",
    short: "وصف مختصر للميزة الثانية يوضح فكرتها الأساسية بسرعة.",
    detailTitle: "عنوان تفصيلي للميزة الثانية",
    detailText:
      "تفاصيل الميزة الثانية: هنا تكتب الشرح الكامل للمتابعة، أو التقارير، أو أي خدمة أساسية تقدمها الشركة.",
    imagePosition: "left",
    image: "/images/img10.jpg",
  },
  {
    id: 3,
    title: "عنوان الميزة الثالثة",
    short: "جملة قصيرة تلخص الميزة الثالثة بشكل جذاب.",
    detailTitle: "عنوان تفصيلي للميزة الثالثة",
    detailText:
      "شرح الميزة الثالثة: تكتب هنا مثال عملي، أو سيناريو يوضح للعميل إزاي يستفيد من الميزة في حياته الواقعية.",
    imagePosition: "right",
    image: "/images/img14.jpg",
  },
  {
    id: 4,
    title: "عنوان الميزة الرابعة",
    short: "وصف بسيط للميزة الرابعة ودورها في خدمة العميل.",
    detailTitle: "عنوان تفصيلي للميزة الرابعة",
    detailText:
      "تفاصيل الميزة الرابعة: ممكن تكون خدمة خاصة، برنامج ولاء، متابعة شخصية، أو أي نقطة قوة تحب توضحها.",
    imagePosition: "left",
    image: "/images/img23.jpg",
  },
    {
    id: 5,
    title: "عنوان الميزة الرابعة",
    short: "وصف بسيط للميزة الرابعة ودورها في خدمة العميل.",
    detailTitle: "عنوان تفصيلي للميزة الرابعة",
    detailText:
      "تفاصيل الميزة الرابعة: ممكن تكون خدمة خاصة، برنامج ولاء، متابعة شخصية، أو أي نقطة قوة تحب توضحها.",
    imagePosition: "right",
    image: "/images/img20.jpg",
  },
      {
    id: 6,
    title: "عنوان الميزة الرابعة",
    short: "وصف بسيط للميزة الرابعة ودورها في خدمة العميل.",
    detailTitle: "عنوان تفصيلي للميزة الرابعة",
    detailText:
      "تفاصيل الميزة الرابعة: ممكن تكون خدمة خاصة، برنامج ولاء، متابعة شخصية، أو أي نقطة قوة تحب توضحها.",
    imagePosition: "left",
    image: "/images/img21.jpg",
  },
        {
    id: 7,
    title: "عنوان الميزة الرابعة",
    short: "وصف بسيط للميزة الرابعة ودورها في خدمة العميل.",
    detailTitle: "عنوان تفصيلي للميزة الرابعة",
    detailText:
      "تفاصيل الميزة الرابعة: ممكن تكون خدمة خاصة، برنامج ولاء، متابعة شخصية، أو أي نقطة قوة تحب توضحها.",
    imagePosition: "left",
    image: "/images/img9.jpg",
  },
        {
    id: 8,
    title: "عنوان الميزة الرابعة",
    short: "وصف بسيط للميزة الرابعة ودورها في خدمة العميل.",
    detailTitle: "عنوان تفصيلي للميزة الرابعة",
    detailText:
      "تفاصيل الميزة الرابعة: ممكن تكون خدمة خاصة، برنامج ولاء، متابعة شخصية، أو أي نقطة قوة تحب توضحها.",
    imagePosition: "right",
    image: "/images/img11.jpg",
  },
];

function LandingPage() {
const [selectedFeatureId, setSelectedFeatureId] = useState(null);

const selectedFeature = FEATURES.find((f) => f.id === selectedFeatureId);
const detailsRef = useRef(null);


  return (
    <div className="landing-page">
    <section className="landing-hero">
      <div className="landing-hero-overlay">
        <div className="hero-content-wrapper">

          <motion.div
            className="hero-logo-wrapper"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
      <img className="hero-logo-img " src="/images/logo.png" alt="" />
          </motion.div>

          <motion.div
            className="hero-side-strip"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            <h2 className="strip-title">7Care Medical</h2>
            <p className="strip-subtitle">(Social Medical Insurance)</p>

            <a href="#about-us" className="strip-btn">
              من نحن؟
            </a>
          </motion.div>

        </div>
      </div>
    </section>

<About />

<section className="features-section">
  <div className="container">

    <h2 className="section-title text-center mb-3">
      المزايا والخدمات الرئيسية
    </h2>

    <p className="section-text text-center mb-5">
      هنا هنكتب سطر تمهيدي بسيط يعرّف العميل إن دي أهم النقاط اللي
      بتميز الشركة والخدمات اللي هتستفيد منها لما تتعامل معانا.
    </p>
<<<<<<< HEAD
=======

>>>>>>> b613287d326b786f74ef885a8c3b731927e60f67
    <div className="row g-3 mb-4">
      {FEATURES.map((feature) => {
        const isActive = feature.id === selectedFeatureId;

        return (
          <div key={feature.id} className="col-6 col-md-3">
            <motion.div
              className={
                "feature-card card " +
                (isActive ? "feature-card-active" : "")
              }
              onClick={() => {
                setSelectedFeatureId(feature.id);

                setTimeout(() => {
                  detailsRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }, 250);
              }}
              whileHover={{ y: isActive ? 6 : -4 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <div className="card-body feature-card-body">
                <div className="feature-card-inner">
                  <div className="feature-card-image-wrapper">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="feature-card-image"
                    />
                  </div>
                  <div className="feature-card-vertical">
                    <span className="feature-vertical-text">
                      {feature.short}
                    </span>
                  </div>
                </div>
                <h5 className="card-title feature-card-title">
                  {feature.title}
                </h5>
              </div>
            </motion.div>
          </div>
        );
      })}
    </div>

    {selectedFeature && (
      <div ref={detailsRef} className="feature-details card mt-4">
        <div className="card-body">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedFeature.id}
              className="row align-items-center"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              {selectedFeature.imagePosition === "left" && (
                <div className="col-md-5 mb-4 mb-md-0">
                  <div className="feature-image-placeholder">
                    <img
                      src={selectedFeature.image}
                      alt={selectedFeature.title}
                      className="feature-detail-image"
                    />
                  </div>
                </div>
              )}

              <div className="col-md-7">
                <h3 className="feature-detail-title">
                  {selectedFeature.detailTitle}
                </h3>
                <p className="feature-detail-text">
                  {selectedFeature.detailText}
                </p>
              </div>

              {selectedFeature.imagePosition === "right" && (
                <div className="col-md-5 mb-4 mb-md-0 order-md-last">
                  <div className="feature-image-placeholder">
                    <img
                      src={selectedFeature.image}
                      alt={selectedFeature.title}
                      className="feature-detail-image"
                    />
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    )}

  </div>
</section>

<section className="logos-section">
  <h2 className="section-title text-center mb-3">شركاء النجاح والجهات المتعاقدة</h2>
  <p className="section-text text-center mb-4">
    هنا هنكتب نص بسيط عن الشركاء والجهات المتعاقدة…
  </p>

  <div className="logos-container">
<div className="track">
  {[
    "/images/Slogo-1.jpg",
    "/images/Slogo-2.jpg",
    "/images/Slogo-3.jpg",
    "/images/Slogo-4.jpg",
    "/images/Slogo-5.jpg",
    "/images/Slogo-6.jpg",
    "/images/Slogo-7.jpg",
    "/images/Slogo-8.jpg",
    "/images/Slogo-9.jpg",
    "/images/Slogo-10.jpg",
    "/images/Slogo-11.jpg",
    "/images/Slogo-12.jpg",

    "/images/Slogo-1.jpg",
    "/images/Slogo-2.jpg",
    "/images/Slogo-3.jpg",
    "/images/Slogo-4.jpg",
    "/images/Slogo-5.jpg",
    "/images/Slogo-6.jpg",
    "/images/Slogo-7.jpg",
    "/images/Slogo-8.jpg",
    "/images/Slogo-9.jpg",
    "/images/Slogo-10.jpg",
    "/images/Slogo-11.jpg",
    "/images/Slogo-12.jpg",
  ].map((img, i) => (
    <span key={i} className="logo-item">
      <img src={img} alt="partner" />
    </span>
  ))}
</div>

<<<<<<< HEAD
=======
        Slogo1, Slogo3, Slogo5, Slogo6, Slogo7, Slogo8, Slogo9, Slogo10, Slogo11,
        Slogo4, Slogo2, Slogo12
      ].map((img, i) => (
        <span key={i} className="logo-item">
          <img src={img} alt="partner" />
        </span>
      ))}
    </div>
>>>>>>> b613287d326b786f74ef885a8c3b731927e60f67
  </div>
</section>

<Footer />

    </div>
  );
}

export default LandingPage;
