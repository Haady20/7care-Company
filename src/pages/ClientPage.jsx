import { useEffect, useState, useRef  } from "react";
import { Link } from "react-router-dom";

import "./ClientPage.css";
import About from "../components/About.jsx";
import Footer from "../components/Footer.jsx";

function ClientPage() {
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

const [headerOpacity, setHeaderOpacity] = useState(1);

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
        const response = await fetch("/db.json");
        const data = await response.json();
        setClient(data.client);
      } catch (err) {
        console.error(err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error || !client) return <div className="loading">Client not found</div>;

  const fullName = `${client.firstName} ${client.lastName}`;

  return (
    <div className="page-wrapper">
      <header style={{ opacity: headerOpacity }} className="header">
              <img className="header-logo" src="/images/logo.png" />
  <div className="hero-content">
    <h2 className="hero-name"><span className="text-dark">{client.job}/ </span>
       {fullName}</h2>
  </div>
      </header>

<section className="hero-section">
  <div className="hero-overlay"></div>

  <div className="hero-text">
    <h2>صحتك في أمان مع نخبة من أفضل الأطباء</h2>
  </div>
</section>

<section className="client-info-card">

  <div className="client-info-photo">
    <img src="/images/Test.png"/>
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
      <span className="info-value">{client.job}</span>
    </div>
    <div className="info-item border-red">
      <span className="info-label">تاريخ التسجيل</span>
      <span className="info-value">{client.startDate}</span>
    </div>

        <div className="info-item border-purple">
      <span className="info-label">تاريخ الانتهاء</span>
      <span className="info-value">{client.endDate}</span>
    </div>
  </div>

</section>
<Link to="/" className="home-btn m-3">
  <i className="fa-solid fa-house"></i>
</Link>



<About/>

      <button
        className="scroll-top-btn"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        ↑
      </button>
  <Footer/>
    </div>
  );
}

export default ClientPage;

// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { fetchClientByQrToken } from "../api/clientApi";

// function ClientPage() {
//   const { qrToken } = useParams();
//   const [client, setClient] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     async function load() {
//       try {
//         setLoading(true);
//         setError(null);
//         const data = await fetchClientByQrToken(qrToken);
//         // backend returns: { client, profileUrl }
//         setClient(data.client);
//       } catch (err) {
//         console.error(err);
//         setError(err.message || "Failed to load client");
//       } finally {
//         setLoading(false);
//       }
//     }

//     if (qrToken) {
//       load();
//     }
//   }, [qrToken]);

//   if (loading) {
//     return <div className="container mt-5">Loading client...</div>;
//   }

//   if (error || !client) {
//     return (
//       <div className="container mt-5">
//         <h2>Client not found</h2>
//         {error && <p>{error}</p>}
//       </div>
//     );
//   }

//   const fullName = `${client.firstName || ""} ${client.lastName || ""}`.trim();

//   return (
//     <div>

//       <header
//         style={{
//           backgroundImage: "url('https://via.placeholder.com/1200x400')",
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           padding: "40px 20px",
//           color: "white",
//           position: "relative",
//         }}
//       >
//         <img
//           src="https://via.placeholder.com/120"
//           alt="logo"
//           style={{ width: 80, position: "absolute", right: 20, top: 20 }}
//         />

//         <h1 style={{ textAlign: "center", fontWeight: "bold" }}>
//           {client.firstName} {client.lastName}
//         </h1>
//       </header>


//       <section className="container my-5">
//         <div className="row">

//           <div className="col-md-4 text-center mb-4">
//             <img
//               src={client.image}
//               alt="client"
//               style={{
//                 width: 180,
//                 height: 180,
//                 borderRadius: "50%",
//                 objectFit: "cover",
//                 border: "4px solid #ddd",
//                 marginTop: "-50px"
//               }}
//             />
//           </div>

//           <div className="col-md-8">
//             <h3 className="mb-3">Client Information</h3>
//             <p><strong>First Name:</strong> {client.firstName}</p>
//             <p><strong>Last Name:</strong> {client.lastName}</p>
//             <p><strong>National ID:</strong> {client.nationalId}</p>
//             <p><strong>Job:</strong> {client.job}</p>
//             <p><strong>Address:</strong> {client.address}</p>
//           </div>

//         </div>
//       </section>


//       <footer className="bg-dark text-light p-4 mt-5">
//         <div className="container">
//           <div className="row">

//             <div className="col-md-6 mb-3">
//               <h5>الشكاوى والمقترحات</h5>
//               <div className="d-flex gap-3 mt-2">
//                 <a href="#" className="text-light">📞 WhatsApp</a>
//                 <a href="#" className="text-light">📧 Email</a>
//                 <a href="#" className="text-light">📘 Facebook</a>
//               </div>
//             </div>

//             <div className="col-md-6 mb-3">
//               <h5>العنوان</h5>
//               <p>Nasr City, Cairo</p>
//               <a 
//                 href="https://maps.google.com" 
//                 target="_blank" 
//                 rel="noreferrer"
//                 className="text-info"
//               >
//                 عرض الموقع على Google Maps
//               </a>
//             </div>

//           </div>
//         </div>
//       </footer>

//     </div>
//   );
// }

// export default ClientPage;