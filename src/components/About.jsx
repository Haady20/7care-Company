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
  <span className="highlight">7Care Medical</span> هي شركة وساطة تأمينية طبية
  بتساعدك تختار أفضل خطط التأمين الصحي بسهولة واطمئنان.  
  نتعاون مع أكبر شركات التأمين في السوق، علشان نوفّر لك اختيارات موثوقة، أسعار مناسبة،
  وخطوات اشتراك بسيطة بدون أي تعقيد.
</p>

<p className="section-text">
  نرافقك خطوة بخطوة… من أول الاستشارة، لاختيار الخطة المناسبة، لحد استلام الوثيقة،
  مع متابعة ودعم شخصي طول فترة التأمين.
</p>

<div className="about-list">
  <p className="list-title">ليه تختار 7Care Medical؟</p>
  <ul>
    <li>ترشيح أفضل خطة تأمين تناسب احتياجات الفرد أو الأسرة.</li>
    <li>شراكات قوية مع أبرز شركات التأمين في مصر.</li>
    <li>اشتراك سريع وخطوات واضحة بدون أي تعقيد.</li>
    <li>متابعة مستمرة ودعم فني وإنساني طول فترة التأمين.</li>
  </ul>
</div>

<p className="section-text final-line">
  مع <span className="highlight">7Care Medical</span>… التأمين الصحي أصبح أسهل، أوضح، وأقرب ليك من أي وقت.
</p>

                <p className="section-text">
                 
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