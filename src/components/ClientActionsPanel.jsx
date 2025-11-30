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
    job: jobs[1] || "Doctor",
    image: null,
  });

  useEffect(() => {
    if (action === "edit" && client) {
      setFormData({
        firstName: client.firstName,
        lastName: client.lastName,
        nationalId: client.nationalId,
        job: client.job,
        image: null,
      });
    } else if (action === "add") {
      setFormData({
        firstName: "",
        lastName: "",
        nationalId: "",
        job: jobs[1] || "Doctor",
        image: null,
      });
    }
  }, [action, client, jobs]);

  if (!action) return null;

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prev) => ({ ...prev, image: files[0] || null }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (action === "add") {
      onAddClient(formData);
    }

    if (action === "edit" && client) {
      onUpdateClient({
        ...client,
        ...formData,
      });
    }
  };

  const handleDeleteClick = () => {
    if (client) {
      const confirmed = window.confirm(
        `Are you sure you want to delete ${client.firstName} ${client.lastName}?`
      );
      if (confirmed) {
        onConfirmDelete(client.id);
      }
    }
  };

  return (
    <div className="card mt-4">
      <div className="card-body">
        {action === "add" && <h4 className="mb-3">Add Client</h4>}
        {action === "edit" && <h4 className="mb-3">Edit Client</h4>}
        {action === "delete" && <h4 className="mb-3">Delete Client</h4>}

        {action === "delete" && client && (
          <>
            <p>
              <strong>First Name:</strong> {client.firstName}
            </p>
            <p>
              <strong>Last Name:</strong> {client.lastName}
            </p>
            <p>
              <strong>National ID:</strong> {client.nationalId}
            </p>
            <p>
              <strong>Job:</strong> {client.job}
            </p>
            <button className="btn btn-danger me-2" onClick={handleDeleteClick}>
              Delete
            </button>
            <button className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
          </>
        )}

        {(action === "add" || action === "edit") && (
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Image</label>
              <input
                type="file"
                className="form-control"
                name="image"
                onChange={handleChange}
                accept="image/*"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">First Name</label>
              <input
                type="text"
                className="form-control"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                className="form-control"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">National ID</label>
              <input
                type="text"
                className="form-control"
                name="nationalId"
                value={formData.nationalId}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Job</label>
              <select
                className="form-select"
                name="job"
                value={formData.job}
                onChange={handleChange}
                required
              >
                {jobs
                  .filter((j) => j !== "All")
                  .map((job) => (
                    <option key={job} value={job}>
                      {job}
                    </option>
                  ))}
              </select>
            </div>

            <button type="submit" className="btn btn-primary me-2">
              {action === "add" ? "Add" : "Update"}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
            >
              Cancel
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ClientActionsPanel;
