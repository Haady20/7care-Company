import { useParams } from "react-router-dom";

function ClientPage() {
  const { id } = useParams();

  const client = {
    firstName: "Ahmed",
    lastName: "Ali",
    nationalId: "12345678901234",
    job: "Doctor",
    address: "Nasr City, Cairo",
    image: "https://via.placeholder.com/150",
  };

  return (
    <div>

      <header
        style={{
          backgroundImage: "url('https://via.placeholder.com/1200x400')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "40px 20px",
          color: "white",
          position: "relative",
        }}
      >
        <img
          src="https://via.placeholder.com/120"
          alt="logo"
          style={{ width: 80, position: "absolute", right: 20, top: 20 }}
        />

        <h1 style={{ textAlign: "center", fontWeight: "bold" }}>
          {client.firstName} {client.lastName}
        </h1>
      </header>


      <section className="container my-5">
        <div className="row">

          <div className="col-md-4 text-center mb-4">
            <img
              src={client.image}
              alt="client"
              style={{
                width: 180,
                height: 180,
                borderRadius: "50%",
                objectFit: "cover",
                border: "4px solid #ddd",
                marginTop: "-50px"
              }}
            />
          </div>

          <div className="col-md-8">
            <h3 className="mb-3">Client Information</h3>
            <p><strong>First Name:</strong> {client.firstName}</p>
            <p><strong>Last Name:</strong> {client.lastName}</p>
            <p><strong>National ID:</strong> {client.nationalId}</p>
            <p><strong>Job:</strong> {client.job}</p>
            <p><strong>Address:</strong> {client.address}</p>
          </div>

        </div>
      </section>


      <footer className="bg-dark text-light p-4 mt-5">
        <div className="container">
          <div className="row">

            <div className="col-md-6 mb-3">
              <h5>الشكاوى والمقترحات</h5>
              <div className="d-flex gap-3 mt-2">
                <a href="#" className="text-light">📞 WhatsApp</a>
                <a href="#" className="text-light">📧 Email</a>
                <a href="#" className="text-light">📘 Facebook</a>
              </div>
            </div>

            <div className="col-md-6 mb-3">
              <h5>العنوان</h5>
              <p>Nasr City, Cairo</p>
              <a 
                href="https://maps.google.com" 
                target="_blank" 
                rel="noreferrer"
                className="text-info"
              >
                عرض الموقع على Google Maps
              </a>
            </div>

          </div>
        </div>
      </footer>

    </div>
  );
}

export default ClientPage;
