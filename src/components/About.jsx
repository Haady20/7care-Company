import "./About.css";
import { motion } from "framer-motion";

function About() {
  return (
<section className="about-section" id="about-us">
        <div className="about-logo-watermark" />
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-5 mb-4 mb-md-0 order-md-2">
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
                {/* <button className="btn btn-primary mt-3">
                  اضغط هنا للعضوية
                </button> */}
              </motion.div>
              
         
            </div>

            <div className="col-md-7 order-md-1">
               <motion.div
                className="about-image-wrapper"
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
              >
                <img className="about-image" src="/images/img24.png" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
        );
}

export default About;