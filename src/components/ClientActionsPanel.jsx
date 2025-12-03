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
  });

  useEffect(() => {
    if (action === "edit" && client) {
      setFormData({
        firstName: client.firstName || "",
        lastName: client.lastName || "",
        job: client.job || "",
        nationalId: client.nationalId || "",
      });
    } else if (action === "add") {
      setFormData({
        firstName: "",
        lastName: "",
        job: "",
        nationalId: "",
      });
    }
  }, [action, client]);

  if (!action) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (action === "add") {
      onAddClient(formData);
    } else if (action === "edit") {
      onUpdateClient({ ...client, ...formData });
    }
  };

  return (
    <div className="client-actions-panel card-shadow">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0 text-gold fw-bold">
          {action === "add" && "Add New Client"}
          {action === "edit" && "Edit Client"}
          {action === "delete" && "Delete Client"}
        </h5>

        <button className="btn-close" onClick={onCancel}></button>
      </div>

      {action === "delete" ? (
        <div>
          <p className="mb-4">
            Are you sure you want to delete{" "}
            <strong>
              {client?.firstName} {client?.lastName}
            </strong>
            ?
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
              <input
                name="firstName"
                className="form-control"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Last Name</label>
              <input
                name="lastName"
                className="form-control"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">National ID</label>
              <input
                name="nationalId"
                className="form-control"
                value={formData.nationalId}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Job</label>
              <select
                name="job"
                className="form-select"
                value={formData.job}
                onChange={handleChange}
              >
                <option value="">Select Job</option>
                {jobs
                  .filter((j) => j !== "All")
                  .map((job) => (
                    <option key={job} value={job}>
                      {job}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div className="d-flex justify-content-end gap-2 mt-4">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={onCancel}
            >
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
