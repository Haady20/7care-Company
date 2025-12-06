import { useEffect, useState } from "react";

function ClientActionsPanel({
  action,
  client,
  jobs,
  onAddClient,
  onUpdateClient,
  onConfirmDelete,
  onCancel,
}) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    job: "",
    nationalId: "",
    address: "",
    googleMapLocation: "",
    complaintsAndSuggestions: "",
    expiryDate: "2026-12-31",
    serviceOne: false,
    serviceTwo: false,
    serviceThree: false,
  });

  useEffect(() => {
    if (action === "edit" && client) {
      setFormData({
        firstName: client.firstName || "",
        lastName: client.lastName || "",
        job: client.job || client.jobTitle || "",
        nationalId: client.nationalId || "",
        address: client.address || "",
        googleMapLocation: client.googleMapLocation || "",
        complaintsAndSuggestions: client.complaintsAndSuggestions || "",
        expiryDate: client.expiryDate?.slice(0, 10) || "2026-12-31",
        serviceOne: client.serviceOne ?? false,
        serviceTwo: client.serviceTwo ?? false,
        serviceThree: client.serviceThree ?? false,
      });
    } else if (action === "add") {
      setFormData({
        firstName: "",
        lastName: "",
        job: "",
        nationalId: "",
        address: "",
        googleMapLocation: "",
        complaintsAndSuggestions: "",
        expiryDate: "2026-12-31",

        serviceOne: false,
        serviceTwo: false,
        serviceThree: false,
      });
    }
  }, [action, client]);


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      clientName: `${formData.firstName} ${formData.lastName}`.trim(),
      firstName: formData.firstName,
      lastName: formData.lastName,
      nationalId: formData.nationalId,
      jobTitle: formData.job,
      address: formData.address,
      googleMapLocation: formData.googleMapLocation,
      complaintsAndSuggestions: formData.complaintsAndSuggestions,
      expiryDate: formData.expiryDate,
      serviceOne: formData.serviceOne,
      serviceTwo: formData.serviceTwo,
      serviceThree: formData.serviceThree,
    };

    if (action === "add") onAddClient(payload);
    else if (action === "edit") onUpdateClient({ ...client, ...payload });
  };

  if (!action) return null;

  return (
    <div className="client-actions-panel card-shadow">

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0 text-gold fw-bold">
          {action === "add" ? "Add New Client" :
          action === "edit" ? "Edit Client" : "Delete Client"}
        </h5>

        <button className="btn-close" onClick={onCancel}></button>
      </div>

      {action === "delete" ? (
        <div>
          <p className="mb-4">
            Are you sure you want to delete{" "}
            <strong>{client?.firstName} {client?.lastName}</strong>?
          </p>

          <div className="d-flex justify-content-end gap-2">
            <button className="btn btn-outline-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button
              className="btn btn-danger"
              onClick={() => onConfirmDelete(client.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ) : (

        <form onSubmit={handleSubmit}>
          <div className="row g-3">

            <div className="col-md-6">
              <label className="form-label">First Name</label>
              <input name="firstName" className="form-control"
                value={formData.firstName} onChange={handleChange} required />
            </div>

            <div className="col-md-6">
              <label className="form-label">Last Name</label>
              <input name="lastName" className="form-control"
                value={formData.lastName} onChange={handleChange} required />
            </div>

            <div className="col-md-6">
              <label className="form-label">National ID</label>
              <input name="nationalId" className="form-control"
                value={formData.nationalId} onChange={handleChange} required />
            </div>

            <div className="col-md-6">
              <label className="form-label">Job</label>
              <select name="job" className="form-select"
                value={formData.job} onChange={handleChange} required >
                <option value="">Select Job</option>
                {jobs.filter(j => j !== "All").map(job =>
                  <option key={job} value={job}>{job}</option>
                )}
              </select>
            </div>

            <div className="col-md-12">
              <label className="form-label">Address</label>
              <input name="address" className="form-control"
                value={formData.address} onChange={handleChange} />
            </div>

            <div className="col-md-12">
              <label className="form-label">Google Map URL</label>
              <input name="googleMapLocation" className="form-control"
                value={formData.googleMapLocation} onChange={handleChange} />
            </div>

            <div className="col-md-12">
              <label className="form-label">Complaints / Suggestions</label>
              <textarea name="complaintsAndSuggestions" className="form-control"
                value={formData.complaintsAndSuggestions} onChange={handleChange} />
            </div>

            <div className="col-md-6">
              <label className="form-label">Expiry Date</label>
              <input type="date" name="expiryDate" className="form-control"
                value={formData.expiryDate} onChange={handleChange} required />
            </div>

            {/* Service Toggles */}
            <div className="col-md-12">
              <label className="form-label d-block">Services</label>

              <div className="form-check">
                <input type="checkbox" className="form-check-input"
                  name="serviceOne" checked={formData.serviceOne}
                  onChange={handleChange} />
                <label className="form-check-label">Service One</label>
              </div>

              <div className="form-check">
                <input type="checkbox" className="form-check-input"
                  name="serviceTwo" checked={formData.serviceTwo}
                  onChange={handleChange} />
                <label className="form-check-label">Service Two</label>
              </div>

              <div className="form-check">
                <input type="checkbox" className="form-check-input"
                  name="serviceThree" checked={formData.serviceThree}
                  onChange={handleChange} />
                <label className="form-check-label">Service Three</label>
              </div>
            </div>

          </div>

          <div className="d-flex justify-content-end gap-2 mt-4">
            <button type="button" className="btn btn-outline-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-gold">
              {action === "add" ? "Add Client" : "Save Changes"}
            </button>
          </div>
        </form>

      )}

    </div>
  );
}

export default ClientActionsPanel;
