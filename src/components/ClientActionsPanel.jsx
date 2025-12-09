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
    nationalId: "",
    address: "",
    image: "",
    expiryDate: "2026-12-31",
  });

  useEffect(() => {
    if (action === "edit" && client) {
      setFormData({
        firstName: client.firstName || "",
        lastName: client.lastName || "",
        nationalId: client.nationalId || "",
        address: client.address || "",
        image: client.image || "",
        expiryDate: client.expiryDate?.slice(0, 10) || "2026-12-31",
      });
    } else if (action === "add") {
      setFormData({
        firstName: "",
        lastName: "",
        nationalId: "",
        address: "",
        image: "",
        expiryDate: "2026-12-31",
      });
    }
  }, [action, client]);


  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file" && files && files[0]) {
      // For file input, read as base64 or store the file
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          [name]: reader.result, // base64 string
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };
  
  const toIsoStartOfDay = (d) => (d ? new Date(`${d}T00:00:00.000Z`).toISOString() : null);

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (action === "add") {
      await onAddClient(formData);
    } 
    else if (action === "edit") {
      await onUpdateClient(client.id, formData);
    }
  } catch (err) {
    console.error("SAVE ERROR:", err);
    alert("Error saving client");
  }
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

            <div className="col-md-12">
              <label className="form-label">Profile Image</label>
              <input type="file" name="image" className="form-control"
                accept="image/*"
                onChange={handleChange} />
              {formData.image && (
                <div className="mt-2">
                  <img src={formData.image} alt="Preview" style={{ height: 80, borderRadius: 4 }} />
                </div>
              )}
            </div>

            <div className="col-md-12">
              <label className="form-label">Address</label>
              <input name="address" className="form-control"
                value={formData.address} onChange={handleChange} />
            </div>

            <div className="col-md-6">
              <label className="form-label">Expiry Date</label>
              <input type="date" name="expiryDate" className="form-control"
                value={formData.expiryDate} onChange={handleChange} required />
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
