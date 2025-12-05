import { useState } from "react";
import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./LandingPage.css";
import Footer from "../../components/Footer.jsx";
import About from "../../components/About.jsx";

const FEATURES = [
  {
    id: 1,
    title: "الخصومات",
    short: "خصومات لاحتياجاتك",
    detailTitle: "الحل الأذكى للرعاية الصحية وتوفير حقيقي",
    detailText:
      "مع كارت MEDICAL هتبقى جزء من أكبر شبكة طبية في مصر. الكارت مش مجرد خصم، ده بيغطي كل احتياجاتك: أدوية، تحاليل، مستشفيات، وكشف عند أكبر الاستشاريين. هتلاقي التوفير ماشي معاك خطوة بخطوة… من أول الصيدلية لحد باب المستشفى. اختار راحة بالك وخلّي صحتك في أمان.",
    imagePosition: "right",
    image: "/images/img4.jpg",
  },

  {
    id: 2,
    title: "خصومات الصيدليات",
    short: "توفير يومي مايتفوتش",
    detailTitle: "محتاج دواء؟ خليه بسعر أقل مع MEDICAL",
    detailText:
      "أسعار الأدوية بقت عبء على أي بيت، علشان كده كارت MEDICAL بيوفر لك خصومات حقيقية على كل أنواع الأدوية في شبكة صيدليات كبيرة ومتاحة في كل مكان. من أدوية الأمراض المزمنة، للمضادات الحيوية، للفيتامينات والمستلزمات… كله بتخفيضات بتفرق معاك. صحتك أهم… وميزانيتك كمان.",
    imagePosition: "left",
    image: "/images/img10.jpg",
  },

  {
    id: 3,
    title: "رعاية الأسرة",
    short: "صحة عيلتك في إيد أمينة",
    detailTitle: "راحة بالك تبدأ من صحة أسرتك",
    detailText:
      "اهتم بصحتك وصحة أسرتك من غير ما تشيل هم التكاليف. كارت MEDICAL بيقدملك أكبر شبكة خصومات طبية في مصر تشمل كل اللي تحتاجه: دواء، تحاليل، وكشف عند أفضل الأطباء. اطمن… ووفر… وإحنا دايمًا جنبك بنصحة ورعاية بتفيدك بجد.",
    imagePosition: "right",
    image: "/images/img14.jpg",
  },

  {
    id: 4,
    title: "خدمة الطوارئ",
    short: "مساعدة سريعة وقت اللزوم",
    detailTitle: "في أول لحظة طارئ… اتصالك بيخلّينا جنبك",
    detailText:
      "في اللحظات اللي ملهاش تعويض، الزمن هو السر. مع خدمة الطوارئ من MEDICAL، مكالمة واحدة كفاية وفريق الإسعاف يوصل لك بسرعة جاهز بالمعدات، ومع تنسيق كامل مع أقرب مستشفى. اللحظة اللي تحتاجنا فيها… هنكون موجودين.",
    imagePosition: "left",
    image: "/images/img11.jpg",
  },

  {
    id: 5,
    title: "رعاية الأمهات",
    short: "راحة وأمان طوال الحمل",
    detailTitle: "ولادتك قربت؟ دورنا نهون عليك التكلفة",
    detailText:
      "تسع شهور انتظار بيبنوا أحلام يوم الولادة… لكن القلق من التكاليف ممكن يعكر فرحتك. مع كارت MEDICAL، عندك خطة توفير كاملة تشمل خصومات قوية على تحاليل الحمل، الفيتامينات، وحتى فاتورة الولادة نفسها. خلي يومك الكبير أهدى… وإحساسك أأمن.",
    imagePosition: "right",
    image: "/images/img20.jpg",
  },

  {
    id: 6,
    title: "الأشعة والفحوصات",
    short: "خصومات مميزة لفحوصات أدق",
    detailTitle: "أشعة وفحوصات بسعر أقل ودقة أعلى",
    detailText:
      "لو محتاج رنين، مقطعية، سونار أو أي نوع أشعة، كارت MEDICAL بيوفر لك خصومات تصل لـ 40% في أفضل مراكز الأشعة المتخصصة. متأجلش صحتك… كل أنواع الفحوصات المطلوبة هتلاقيها متاحة ليك بسعر مناسب وجودة عالية.",
    imagePosition: "left",
    image: "/images/img9.jpg",
  },

  {
    id: 7,
    title: "رعاية الأطفال",
    short: "عشان صحة ابنك بالدنيا",
    detailTitle: "ولادك أغلى ما تملك… وده دورنا نحافظ عليهم",
    detailText:
      "من علاج الأطفال، للفيتامينات، للّبن العلاجي، كل احتياجات صغيرك بخصومات قوية تخليك تقول: إزاي كنت ماشي من غير الكارت ده؟ وعلشان العناية شاملة، هتلاقي كمان خصومات كشف الأطفال، التحاليل الدورية، فحوصات السمع والنظر، وحتى مستلزمات الرضع. رعاية كاملة… وراحة بال ليك ولهم.",
    imagePosition: "left",
    image: "/images/img21.jpg",
  },

  {
    id: 8,
    title: "تأمين الشركات",
    short: "حلول تأمينية موثوقة للشركات",
    detailTitle: "تأمين صحي محترف… يدعم فريقك ويرفع شغله",
    detailText:
      "نوفر برامج تأمين صحي متكاملة للشركات تشمل خصومات واسعة على الخدمات الطبية، وباقات VIP للإدارة مع رعاية متقدمة واستشارات نخبة الأطباء. البرنامج بيقلّل تكلفة الشركة، يرفع إنتاجية الموظفين، ويزيد ولاءهم… مع خدمة دعم دايمًا متاحة.",
    imagePosition: "right",
    image: "/images/img23.jpg",
  },
];

function LandingPage() {
  const [selectedFeatureId, setSelectedFeatureId] = useState(null);
  const selectedFeature = FEATURES.find((f) => f.id === selectedFeatureId);
  const detailsRef = useRef(null);

  const logos = [
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
  ];

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
            اهم الخدمات المتوفرة للعملاء
          </p>

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
            <div
              ref={detailsRef}
              className="feature-details card mt-4 shadow-lg border-0 rounded-4"
            >
              <div className="card-body p-4 p-md-5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedFeature.id}
                    className="row align-items-center g-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    {/* Image Left */}
                    {selectedFeature.imagePosition === "left" && (
                      <div className="col-md-5">
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.45 }}
                          className="feature-image-wrapper shadow-sm rounded-4 overflow-hidden"
                        >
                          <img
                            src={selectedFeature.image}
                            alt={selectedFeature.title}
                            className="feature-detail-image w-100"
                          />
                        </motion.div>
                      </div>
                    )}

                    {/* Text Section */}
                    <div className="col-md-7">
                      <motion.h3
                        className="feature-detail-title mb-3 fw-bold"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.45 }}
                      >
                        {selectedFeature.detailTitle}
                      </motion.h3>

                      <motion.p
                        className="feature-detail-text fs-5 lh-lg"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.55 }}
                      >
                        {selectedFeature.detailText}
                      </motion.p>
                    </div>

                    {/* Image Right */}
                    {selectedFeature.imagePosition === "right" && (
                      <div className="col-md-5 order-md-last">
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.45 }}
                          className="feature-image-wrapper shadow-sm rounded-4 overflow-hidden"
                        >
                          <img
                            src={selectedFeature.image}
                            alt={selectedFeature.title}
                            className="feature-detail-image w-100"
                          />
                        </motion.div>
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
        <h2 className="section-title text-center mb-3">
          شركاء النجاح والجهات المتعاقدة
        </h2>
        <p className="section-text text-center mb-4">
          نوفر خدماتنا عبر شبكة موثوقة من المستشفيات والمراكز الطبية
          والصيدليات المتعاقدة، لضمان جودة رعاية عالية لعملائنا
        </p>

        <div className="logos-container">
          <div className="track">
            {/* المجموعة الأولى */}
            {logos.map((logo, index) => (
              <span key={`first-${index}`} className="logo-item">
                <img src={logo} alt={`partner-${index}`} loading="lazy" />
              </span>
            ))}
            {/* المجموعة الثانية - نسخة طبق الأصل */}
            {logos.map((logo, index) => (
              <span key={`second-${index}`} className="logo-item">
                <img src={logo} alt={`partner-${index}`} loading="lazy" />
              </span>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default LandingPage;
