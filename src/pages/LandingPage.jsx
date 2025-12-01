import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./LandingPage.css";

import codixLogo from "../assets/images/Codix-Logo.jpg";

const FEATURES = [
  {
    id: 1,
    title: "عنوان الميزة الأولى",
    short: "وصف مختصر للميزة الأولى في جملة أو سطرين.",
    detailTitle: "عنوان تفصيلي للميزة الأولى",
    detailText:
      "هنا هنشرح بالتفصيل الميزة الأولى: إزاي بتفيد العميل، إزاي الشركة بتطبقها، وأي أرقام أو أمثلة تحب تضيفها لاحقًا.",
    imagePosition: "right",
    image: "",
  },
  {
    id: 2,
    title: "عنوان الميزة الثانية",
    short: "وصف مختصر للميزة الثانية يوضح فكرتها الأساسية بسرعة.",
    detailTitle: "عنوان تفصيلي للميزة الثانية",
    detailText:
      "تفاصيل الميزة الثانية: هنا تكتب الشرح الكامل للمتابعة، أو التقارير، أو أي خدمة أساسية تقدمها الشركة.",
    imagePosition: "left",
    image: "",
  },
  {
    id: 3,
    title: "عنوان الميزة الثالثة",
    short: "جملة قصيرة تلخص الميزة الثالثة بشكل جذاب.",
    detailTitle: "عنوان تفصيلي للميزة الثالثة",
    detailText:
      "شرح الميزة الثالثة: تكتب هنا مثال عملي، أو سيناريو يوضح للعميل إزاي يستفيد من الميزة في حياته الواقعية.",
    imagePosition: "right",
    image: "",
  },
  {
    id: 4,
    title: "عنوان الميزة الرابعة",
    short: "وصف بسيط للميزة الرابعة ودورها في خدمة العميل.",
    detailTitle: "عنوان تفصيلي للميزة الرابعة",
    detailText:
      "تفاصيل الميزة الرابعة: ممكن تكون خدمة خاصة، برنامج ولاء، متابعة شخصية، أو أي نقطة قوة تحب توضحها.",
    imagePosition: "left",
    image: "",
  },
];

function LandingPage() {
const [selectedFeatureId, setSelectedFeatureId] = useState(null);

const selectedFeature = FEATURES.find((f) => f.id === selectedFeatureId);


  return (
    <div className="landing-page">
      <section className="landing-hero">
        <div className="landing-hero-overlay">
          <div className="container h-100">
            <div className="row align-items-center h-100">
              {/* اللوجو على الشمال */}
              <div className="col-md-3 text-md-start text-center mb-3 mb-md-0">
                <motion.div
                  className="hero-logo-wrapper"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                >
                  <img
                    src={""}
                    alt="Company Logo"
                    className="hero-logo-img"
                  />
                </motion.div>
              </div>

              <div className="col-md-9 text-md-start text-center hero-titles-container">
                <motion.h1
                  className="hero-title"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                >
                  7Care Medical
                </motion.h1>
                <motion.p
                  className="hero-subtitle"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.25 }}
                >
                  <span>Social Medical Insurance</span>
                </motion.p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-section">
        <div className="about-logo-watermark" />
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-5 mb-4 mb-md-0 order-md-2">
              <motion.div
                className="about-image-wrapper"
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
              >
                <img
                  src={""}
                  alt="About company"
                  className="about-image"
                />
              </motion.div>
            </div>

            <div className="col-md-7 order-md-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              >
                <h2 className="section-title">نبذة عن الشركة</h2>
                <p className="section-text">
                  هنا هنكتب فقرة تعريفية عن الشركة: متى بدأت، رسالتها، رؤيتها،
                  والقيمة اللي بتقدمها للعملاء. نص يمهّد للكلاينت اللي لسه
                  بيتعرف على الشركة لأول مرة.
                </p>
                <p className="section-text">
                  ممكن تضيف هنا سطر إضافي يوضح نوع الخدمات (ائتمان، تسهيلات،
                  متابعة مالية، الخ...) بحيث العميل يخرج وهو فاهم الشركة بتعمل إيه
                  بالضبط.
                </p>
                <button className="btn btn-primary mt-3">
                  اضغط هنا للعضوية
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <h2 className="section-title text-center mb-3">
            المزايا والخدمات الرئيسية
          </h2>
          <p className="section-text text-center mb-5">
            هنا هنكتب سطر تمهيدي بسيط يعرّف العميل إن دي أهم النقاط اللي
            بتميز الشركة والخدمات اللي هتستفيد منها لما تتعامل معانا.
          </p>

          <div className="row g-3 mb-4">
            {FEATURES.map((feature) => {
              const isActive = feature.id === selectedFeatureId;
              return (
                <div key={feature.id} className="col-6 col-md-3">
                  <motion.div
                    className={
                      "feature-card card " + (isActive ? "feature-card-active" : "")
                    }
                    onClick={() => setSelectedFeatureId(feature.id)}
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
  <div className="feature-details card mt-4">
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
        <div className="container">
          <h2 className="section-title text-center mb-3">
            شركاء النجاح والجهات المتعاقدة
          </h2>
          <p className="section-text text-center mb-4">
            هنا هنكتب نص بسيط يقول إن الشركة متعاقدة مع عدد من المستشفيات،
            المعامل، الشركات، أو أي جهات أخرى، ونستخدم الشعارات هنا كدليل
            اجتماعي (Social Proof).
          </p>

          <div className="logos-wrapper">
            <div className="logos-row logos-row-top">
              <div className="logo-strip scroll-left">
                <span className="logo-item">Logo 1</span>
                <span className="logo-item">Logo 2</span>
                <span className="logo-item">Logo 3</span>
                <span className="logo-item">Logo 4</span>
                <span className="logo-item">Logo 5</span>
                <span className="logo-item">Logo 6</span>
                <span className="logo-item">Logo 1</span>
                <span className="logo-item">Logo 2</span>
                <span className="logo-item">Logo 3</span>
                <span className="logo-item">Logo 4</span>
                <span className="logo-item">Logo 5</span>
                <span className="logo-item">Logo 6</span>
              </div>
            </div>

            <div className="logos-row logos-row-bottom">
              <div className="logo-strip scroll-right">
                <span className="logo-item">Logo</span>
                <span className="logo-item">Logo</span>
                <span className="logo-item">Logo</span>
                <span className="logo-item">Logo</span>
                <span className="logo-item">Logo</span>
                <span className="logo-item">Logo</span>
                <span className="logo-item">Logo</span>
                <span className="logo-item">Logo</span>
                <span className="logo-item">Logo</span>
                <span className="logo-item">Logo</span>
                <span className="logo-item">Logo</span>
                <span className="logo-item">Logo</span>
              </div>
            </div>
          </div>
        </div>
      </section>

<footer className="site-footer mt-5">
  <div className="container py-5">
    <div className="row justify-content-between">

      {/* LEFT SIDE */}
      <div className="col-lg-6 mb-4">
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h4 className="footer-title">Feedback & Complaints</h4>
          <p className="footer-text">
            For any complaints, suggestions, or service inquiries, feel free to
            contact our team anytime.
          </p>

          {/* Social icons */}
          <div className="footer-social mt-3 d-flex gap-3">
            <a href="#!" className="social-icon"><i className="fas fa-phone"></i></a>
            <a href="#!" className="social-icon"><i className="fab fa-whatsapp"></i></a>
            <a href="#!" className="social-icon"><i className="fas fa-envelope"></i></a>
            <a href="#!" className="social-icon"><i className="fab fa-instagram"></i></a>
            <a href="#!" className="social-icon"><i className="fab fa-facebook-f"></i></a>
          </div>

          {/* TEAM CARD */}
          <motion.div
            className="team-card card bg-dark text-white border-0 shadow rounded-4 p-3 mt-5"
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          >
            <div className="row g-0 align-items-center">
              
              {/* Logo */}
              <div className="col-5 d-flex justify-content-center">
                <img
                  src={codixLogo}
                  alt="Codix Logo"
                  className="img-fluid team-logo"
                />
              </div>

              {/* Text */}
              <div className="col-7 ps-2">
                <h5 className="fw-bold mb-1">
                  Developed by <span className="text-info">Codix</span>
                </h5>
                <p className="team-text fst-italic mb-2">
                  Delivering modern and elegant digital solutions.
                </p>

                {/* Team social small */}
                <div className="d-flex gap-2 mt-2">
                  <a href="#!" className="social-icon-small"><i className="fab fa-whatsapp"></i></a>
                  <a href="#!" className="social-icon-small"><i className="fas fa-envelope"></i></a>
                  <a href="#!" className="social-icon-small"><i className="fab fa-instagram"></i></a>
                  <a href="#!" className="social-icon-small"><i className="fab fa-facebook-f"></i></a>
                </div>
              </div>

            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="col-lg-5">
        <motion.div
          initial={{ opacity: 0, x: 25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h5 className="footer-subtitle">Address</h5>
          <p className="footer-text">
            Add the full address of the company here: building, street, city.
          </p>

          <div className="footer-map mt-3">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28549.950296255414!2d31.67742577597444!3d26.560497655508154!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x144f59375b0e09f1%3A0xa33bfcf664c5f2fe!2sSohag%2C%20El-Khouly%2C%20Sohag%201%2C%20Sohag%20Governorate!5e0!3m2!1sen!2seg!4v1764536372589!5m2!1sen!2seg"
              width="100%"
              height="350"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
            ></iframe>
          </div>
        </motion.div>
      </div>

    </div>
  </div>
</footer>

    </div>
  );
}

export default LandingPage;
