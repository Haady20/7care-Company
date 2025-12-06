import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";

import "./ClientPage.css";
import About from "../../components/About.jsx";
import Footer from "../../components/Footer.jsx";
import { getClientByQrToken } from "../../api/clientApi";

function ClientPage() {
  const { qrToken } = useParams(); // ← مهم جداً
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [headerOpacity, setHeaderOpacity] = useState(1);

  // Header scroll opacity
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      let newOpacity = 1 - scrollY / 150;
      if (newOpacity < 0) newOpacity = 0;
      setHeaderOpacity(newOpacity);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    async function load() {
      try {
        const data = await getClientByQrToken(qrToken);
        // Handle both wrapped and unwrapped responses
        setClient(data.client || data);
      } catch (err) {
        setError("Client not found");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [qrToken]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error || !client) return <div className="loading">Client Not Found</div>;

  const fullName = `${client.firstName} ${client.lastName}`;

  return (
    <div className="page-wrapper">
      <header style={{ opacity: headerOpacity }} className="header">
        <img className="header-logo" src="/images/logo.png" alt="Logo" />

        <div className="hero-content">
          <h2 className="hero-name">
            <span className="text-dark">{client.jobTitle}/ </span>
            {fullName}
          </h2>
        </div>
      </header>

      <section className="hero-section">
        <div className="hero-overlay"></div>

        <div className="hero-content-wrapper fix">
          <motion.div
            className="hero-logo-wrapper"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          ></motion.div>

          <motion.div
            className="hero-side-strip enhanced-strip"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            <div className="strip-accent"></div>

            <h2 className="strip-title">
              <span className="highlight">7Care</span> Medical
            </h2>

            <p className="strip-subtitle">
              صحتك في أمان مع نخبة من أفضل الأطباء
            </p>

            <a href="#about-us" className="strip-btn enhanced-btn">
              تعرف علينا
            </a>
          </motion.div>
        </div>
      </section>

      <section className="client-info-card">
        <div className="client-info-photo">
          <img src={client.image || "/images/Test.png"} alt="Client" />
        </div>

        <h3 className="client-info-name">{fullName}</h3>

        <div className="client-info-grid">
          <div className="info-item border-blue">
            <span className="info-label">الاسم الأول</span>
            <span className="info-value">{client.firstName}</span>
          </div>

          <div className="info-item border-blue-dark">
            <span className="info-label">الاسم الأخير</span>
            <span className="info-value">{client.lastName}</span>
          </div>

          <div className="info-item border-green">
            <span className="info-label">الرقم القومي</span>
            <span className="info-value">{client.nationalId}</span>
          </div>

          <div className="info-item border-purple">
            <span className="info-label">الوظيفة</span>
            <span className="info-value">{client.jobTitle}</span>
          </div>

          <div className="info-item border-red">
            <span className="info-label">تاريخ التسجيل</span>
            <span className="info-value">
              {new Date(client.registrationDate).toLocaleDateString("ar-EG")}
            </span>
          </div>

          <div className="info-item border-purple">
            <span className="info-label">تاريخ الانتهاء</span>
            <span className="info-value">
              {client.expiryDate
                ? new Date(client.expiryDate).toLocaleDateString("ar-EG")
                : "—"}
            </span>
          </div>
        </div>
      </section>

      <Link to="/landing" className="home-btn m-3">
        <i className="fa-solid fa-house"></i>
      </Link>

      <About />

      <button
        className="scroll-top-btn"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        UP
      </button>

      <Footer />
    </div>
  );
}

export default ClientPage;