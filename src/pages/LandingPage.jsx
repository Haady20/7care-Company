import { useState } from "react";
import "./LandingPage.css";
import codixLogo from "../assets/images/Codix-Logo.jpg";
// import img1 from "../assets/images/img1.jpg";

const FEATURES = [
  {
    id: 1,
    title: "عنوان الميزة الأولى",
    short: "هنا هنكتب وصف مختصر للميزة الأولى في جملة أو سطرين.",
    detailTitle: "عنوان تفصيلي للميزة الأولى",
    detailText:
      "هنا هنشرح بالتفصيل الميزة الأولى: إزاي بتفيد العميل، إزاي الشركة بتطبقها، وأي أرقام أو أمثلة تحب تضيفها لاحقًا.",
    imagePosition: "right", // الصورة يمين والنص شمال
  },
  {
    id: 2,
    title: "عنوان الميزة الثانية",
    short: "وصف مختصر للميزة الثانية يوضح فكرتها الأساسية بسرعة.",
    detailTitle: "عنوان تفصيلي للميزة الثانية",
    detailText:
      "تفاصيل الميزة الثانية: هنا تكتب الشرح الكامل للمتابعة، أو التقارير، أو أي خدمة أساسية تقدمها الشركة.",
    imagePosition: "left", // الصورة شمال والنص يمين
  },
  {
    id: 3,
    title: "عنوان الميزة الثالثة",
    short: "جملة قصيرة تلخص الميزة الثالثة بشكل جذاب.",
    detailTitle: "عنوان تفصيلي للميزة الثالثة",
    detailText:
      "شرح الميزة الثالثة: تكتب هنا مثال عملي، أو سيناريو يوضح للعميل إزاي يستفيد من الميزة في حياته الواقعية.",
    imagePosition: "right",
  },
  {
    id: 4,
    title: "عنوان الميزة الرابعة",
    short: "وصف بسيط للميزة الرابعة ودورها في خدمة العميل.",
    detailTitle: "عنوان تفصيلي للميزة الرابعة",
    detailText:
      "تفاصيل الميزة الرابعة: ممكن تكون خدمة خاصة، برنامج ولاء، متابعة شخصية، أو أي نقطة قوة تحب توضحها.",
    imagePosition: "left",
  },
];

function LandingPage() {
  const [selectedFeatureId, setSelectedFeatureId] = useState(FEATURES[0].id);

  const selectedFeature =
    FEATURES.find((f) => f.id === selectedFeatureId) || FEATURES[0];

  return (
    <div className="landing-page">

      <section className="landing-hero">
        <div className="container">
          <div className="row align-items-center">

            <div className="col-md-3 text-md-start text-center mb-3 mb-md-0">
              <div className="hero-logo-placeholder">
                LOGO
              </div>
            </div>

            <div className="col-md-6 text-center mb-3 mb-md-0">
              <h1 className="hero-title">
                هنا هنحط عنوان جذاب يعرّف العميل بالشركة
              </h1>
              <p className="hero-subtitle">
                وهنا هنكتب سطر أو سطرين يشرحوا باختصار فكرة الشركة والخدمة
                الرئيسية اللي بتقدمها للعميل.
              </p>
            </div>

            <div className="col-md-3 text-md-end text-center">
              <div className="hero-image-placeholder">
                IMAGE
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="about-section">
        <div className="about-logo-watermark">
        </div>
        <div className="container">
          <div className="row align-items-center">

            <div className="col-md-4 mb-4 mb-md-0">
              <div className="about-image-placeholder">
                IMAGE
              </div>
            </div>

            <div className="col-md-8">
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
            </div>

          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <h2 className="section-title text-center mb-4">
            المزايا والخدمات الرئيسية
          </h2>
          <p className="section-text text-center mb-5">
            هنا هنكتب سطر تمهيدي بسيط يعرّف العميل إن دي أهم النقاط اللي
            بتميز الشركة والخدمات اللي هتستفيد منها لما تتعامل معانا.
          </p>

          <div className="row g-3 mb-4">
            {FEATURES.map((feature) => (
              <div
                key={feature.id}
                className="col-6 col-md-3"
              >
                <div
                  className={
                    "feature-card card text-center " +
                    (feature.id === selectedFeatureId ? "active" : "")
                  }
                  onClick={() => setSelectedFeatureId(feature.id)}
                >
                  <div className="card-body">
                    <h5 className="card-title">{feature.title}</h5>
                    <p className="card-text feature-short-text">
                      {feature.short}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="feature-details card">
            <div className="card-body">
              <div className="row align-items-center">

                {selectedFeature.imagePosition === "left" && (
                  <div className="col-md-5 mb-4 mb-md-0">
                    <div className="feature-image-placeholder">
                      IMAGE
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
                  <p className="feature-detail-text">
                  </p>
                </div>

                {selectedFeature.imagePosition === "right" && (
                  <div className="col-md-5 mb-4 mb-md-0 order-md-last">
                    <div className="feature-image-placeholder">
                      IMAGE
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>

        </div>
      </section>

      <section className="logos-section">
        <div className="container">
          <h2 className="section-title text-center mb-4">
            شركاء النجاح والجهات المتعاقدة
          </h2>
          <p className="section-text text-center mb-4">
            هنا هنكتب نص بسيط يقول إن الشركة متعاقدة مع عدد من المستشفيات،
            المعامل، الشركات، أو أي جهات أخرى، ونستخدم الشعارات هنا كدليل
            اجتماعي (Social Proof).
          </p>

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
              <span className="logo-item">Logo A</span>
              <span className="logo-item">Logo B</span>
              <span className="logo-item">Logo C</span>
              <span className="logo-item">Logo D</span>
              <span className="logo-item">Logo E</span>
              <span className="logo-item">Logo F</span>
              <span className="logo-item">Logo A</span>
              <span className="logo-item">Logo B</span>
              <span className="logo-item">Logo C</span>
              <span className="logo-item">Logo D</span>
              <span className="logo-item">Logo E</span>
              <span className="logo-item">Logo F</span>
            </div>
          </div>
        </div>
      </section>

<footer className="site-footer">
  <div>
    <div className="d-flex justify-content-evenly">

      {/* LEFT SECTION */}
      <div>
        <h4 className="footer-title">Feedback & Complaints</h4>
        <p className="footer-text">
          For any complaints, suggestions, or service inquiries, feel free to contact our team anytime.
        </p>

        {/* Social Icons */}
        <div className="footer-social mt-3">
          <a href="#!" className="social-icon" aria-label="Phone">
            <i className="fas fa-phone"></i>
          </a>
          <a href="#!" className="social-icon" aria-label="WhatsApp">
            <i className="fab fa-whatsapp"></i>
          </a>
          <a href="#!" className="social-icon" aria-label="Email">
            <i className="fas fa-envelope"></i>
          </a>
          <a href="#!" className="social-icon" aria-label="Instagram">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#!" className="social-icon" aria-label="Facebook">
            <i className="fab fa-facebook-f"></i>
          </a>
        </div>

        {/* TEAM SECTION */}
        <div className="row mt-5">
          <div className="col-12 d-flex justify-content-center">
            <div className="team-card card bg-dark text-white border-0 shadow rounded-3 overflow-hidden p-3">
              <div className="row g-0 align-items-center">

                {/* Logo */}
                <div className="col-5 d-flex justify-content-center">
                  <img
                    src={codixLogo}
                    alt="Codix Logo"
                    className="img-fluid team-logo"
                    style={{ maxHeight: "300px" }}   // ★ تم تكبيرها إلى 300px هنا فقط
                  />
                </div>

                {/* Text */}
                <div className="col-7">
                  <h5 className="fw-bold mb-1">
                    Developed by <span className="text-info">Codix</span>
                  </h5>
                  <p className="team-text fst-italic mb-2">
                    Delivering modern and elegant digital solutions.
                  </p>

                  {/* Social icons under team */}
                  <div className="d-flex gap-2 mt-2">
                    <a href="#!" className="social-icon-small">
                      <i className="fab fa-whatsapp"></i>
                    </a>
                    <a href="#!" className="social-icon-small">
                      <i className="fas fa-envelope"></i>
                    </a>
                    <a href="#!" className="social-icon-small">
                      <i className="fab fa-instagram"></i>
                    </a>
                    <a href="#!" className="social-icon-small">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SECTION — ADDRESS + MAP */}
      <div className="footer-address">
        <h5 className="footer-subtitle">Address</h5>

        <p className="footer-text">
          Add the full address of the company here: building, street, city.
        </p>

        <div className="footer-map mt-2">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28549.950296255414!2d31.67742577597444!3d26.560497655508154!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x144f59375b0e09f1%3A0xa33bfcf664c5f2fe!2sSohag%2C%20El-Khouly%2C%20Sohag%201%2C%20Sohag%20Governorate!5e0!3m2!1sen!2seg!4v1764536372589!5m2!1sen!2seg"
            width="100%"
            height="350"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

    </div>
  </div>
</footer>

    </div>
  );
}

export default LandingPage;
