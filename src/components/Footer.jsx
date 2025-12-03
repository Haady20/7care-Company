import "./Footer.css";
import { motion } from "framer-motion";
import codixLogo from "../assets/images/Codix-Logo.jpg";

function Footer() {
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
  );
}

export default Footer;