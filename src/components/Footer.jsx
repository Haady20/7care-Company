import "./Footer.css";
import { motion } from "framer-motion";
import { useState } from "react";



function Footer() {
  
const location1 =
 "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3455.5807414390724!2d31.160480676173098!3d29.991476821077292!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjnCsDU5JzI5LjMiTiAzMcKwMDknNDcuMCJF!5e0!3m2!1sen!2seg!4v1764857490354!5m2!1sen!2seg";
const location2 =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3451.455704939325!2d31.325906376176352!3d30.109771015471427!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14581594fed8c49b%3A0x6296a18aba52dc63!2s48%20Gesr%20Al%20Suez%2C%20El-Nozha%2C%20El%20Nozha%2C%20Cairo%20Governorate%204470020!5e0!3m2!1sen!2seg!4v1764857055548!5m2!1sen!2seg";

  const [mapSrc, setMapSrc] = useState(location1);

  return (
<footer className="site-footer">
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
            <a href="tel:023597010" className="social-icon">
              <i className="fas fa-phone"></i>
            </a>
            <a href="https://wa.me/01018060477" className="social-icon"><i className="fab fa-whatsapp"></i></a>
            {/* <a href="#!" className="social-icon"><i className="fas fa-envelope"></i></a> */}
            <a href="https://www.facebook.com/profile.php?id=61583585953989" className="social-icon"><i className="fab fa-facebook-f"></i></a>
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
                <img className="team-logo" src="/images/Codix-Logo.jpg" />

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
                  <a href="https://wa.me/01016784274" className="social-icon-small"><i className="fab fa-whatsapp"></i></a>
                  <a href="https://www.linkedin.com/company/codix-tech/" className="social-icon-small"> <i className="fab fa-linkedin"></i></a>
                  <a href="https://www.instagram.com/codix.tech?igsh=MXZ2Mnd4YnI3cmJtNg==" className="social-icon-small"><i className="fab fa-instagram"></i></a>
                  <a href="https://www.facebook.com/share/1CS6U1visH/?mibextid=wwXIfr" className="social-icon-small"><i className="fab fa-facebook-f"></i></a>
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

  <div className="map-buttons">
    <button onClick={() => setMapSrc(location1)} className="map-btn">
    Location One
    </button>

    <button onClick={() => setMapSrc(location2)} className="map-btn">
        Location Two
    </button>
  </div>

  <iframe
    key={mapSrc} 
    src={mapSrc}
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
  );
}

export default Footer;