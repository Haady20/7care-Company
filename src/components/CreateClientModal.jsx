import { useEffect, useMemo, useState } from "react";
import { createClient } from "../api/clientApi";

const initial = {
  clientName: "",
  logo: "",
  image: "",
  firstName: "",
  lastName: "",
  nationalId: "",
  jobTitle: "",
  organization: "",
  serviceOne: false,
  serviceTwo: false,
  serviceThree: false,
  expiryDate: "", // HTML date input -> "YYYY-MM-DD"
  address: "",
  googleMapLocation: "",
  complaintsAndSuggestions: "",
};

export default function CreateClientModal({ show, onClose, onCreated }) {
  const [form, setForm] = useState(initial);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null); // { client, profileUrl, qrImage }

  useEffect(() => {
    if (!show) {
      setForm(initial);
      setSubmitting(false);
      setError("");
      setResult(null);
    }
  }, [show]);

  const canSubmit = useMemo(() => {
    // Minimal required fields (tweak as you like)
    return form.clientName.trim().length > 0 || (form.firstName.trim() && form.lastName.trim());
  }, [form]);

  const update = (k, v) => setForm((s) => ({ ...s, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit || submitting) return;

    setSubmitting(true);
    setError("");

    // convert empty strings to undefined so backend can ignore
    const payload = Object.fromEntries(
      Object.entries(form).map(([k, v]) => [k, v === "" ? undefined : v])
    );

    try {
      const data = await createClient(payload);
      setResult(data); // { client, profileUrl, qrImage }
      onCreated?.(data.client); // refresh list
    } catch (err) {
      console.error(err);
      setError("Failed to create client. Please check fields and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const closeAll = () => {
    onClose?.();
  };

  if (!show) return null;

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      role="dialog"
      aria-modal="true"
      aria-labelledby="createClientModalLabel"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 id="createClientModalLabel" className="modal-title">{result ? "Client Created" : "Create Client"}</h5>
            <button type="button" className="btn-close" onClick={closeAll} />
          </div>

          <div className="modal-body">
            {!result ? (
              <form onSubmit={handleSubmit} className="row g-3">
                {error && <div className="alert alert-danger">{error}</div>}

                <div className="col-12">
                  <label className="form-label">Client Name</label>
                  <input
                    className="form-control"
                    value={form.clientName}
                    onChange={(e) => update("clientName", e.target.value)}
                    placeholder="Acme Corp"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">First Name</label>
                  <input
                    className="form-control"
                    value={form.firstName}
                    onChange={(e) => update("firstName", e.target.value)}
                    placeholder="John"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Last Name</label>
                  <input
                    className="form-control"
                    value={form.lastName}
                    onChange={(e) => update("lastName", e.target.value)}
                    placeholder="Doe"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Job Title</label>
                  <input
                    className="form-control"
                    value={form.jobTitle}
                    onChange={(e) => update("jobTitle", e.target.value)}
                    placeholder="Manager"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Organization</label>
                  <input
                    className="form-control"
                    value={form.organization}
                    onChange={(e) => update("organization", e.target.value)}
                    placeholder="Acme Corp"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">National ID</label>
                  <input
                    className="form-control"
                    value={form.nationalId}
                    onChange={(e) => update("nationalId", e.target.value)}
                    placeholder="12345678901234"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Expiry Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={form.expiryDate}
                    onChange={(e) => update("expiryDate", e.target.value)}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Logo URL</label>
                  <input
                    className="form-control"
                    value={form.logo}
                    onChange={(e) => update("logo", e.target.value)}
                    placeholder="https://example.com/logo.png"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Image URL</label>
                  <input
                    className="form-control"
                    value={form.image}
                    onChange={(e) => update("image", e.target.value)}
                    placeholder="https://example.com/photo.png"
                  />
                </div>

                <div className="col-12">
                  <label className="form-label">Address</label>
                  <input
                    className="form-control"
                    value={form.address}
                    onChange={(e) => update("address", e.target.value)}
                    placeholder="123 Main St"
                  />
                </div>

                <div className="col-12">
                  <label className="form-label">Google Map Location URL</label>
                  <input
                    className="form-control"
                    value={form.googleMapLocation}
                    onChange={(e) => update("googleMapLocation", e.target.value)}
                    placeholder="https://maps.google.com/?q=123+Main+St"
                  />
                </div>

                <div className="col-12">
                  <label className="form-label">Complaints & Suggestions</label>
                  <textarea
                    className="form-control"
                    rows={2}
                    value={form.complaintsAndSuggestions}
                    onChange={(e) => update("complaintsAndSuggestions", e.target.value)}
                  />
                </div>

                <div className="col-12 d-flex gap-3">
                  <div className="form-check">
                    <input
                      id="serviceOne"
                      className="form-check-input"
                      type="checkbox"
                      checked={form.serviceOne}
                      onChange={(e) => update("serviceOne", e.target.checked)}
                    />
                    <label htmlFor="serviceOne" className="form-check-label">Service One</label>
                  </div>
                  <div className="form-check">
                    <input
                      id="serviceTwo"
                      className="form-check-input"
                      type="checkbox"
                      checked={form.serviceTwo}
                      onChange={(e) => update("serviceTwo", e.target.checked)}
                    />
                    <label htmlFor="serviceTwo" className="form-check-label">Service Two</label>
                  </div>
                  <div className="form-check">
                    <input
                      id="serviceThree"
                      className="form-check-input"
                      type="checkbox"
                      checked={form.serviceThree}
                      onChange={(e) => update("serviceThree", e.target.checked)}
                    />
                    <label htmlFor="serviceThree" className="form-check-label">Service Three</label>
                  </div>
                </div>

                <div className="col-12 d-flex justify-content-end gap-2 pt-2">
                  <button type="button" className="btn btn-outline-secondary" onClick={closeAll}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary" disabled={!canSubmit || submitting}>
                    {submitting ? "Creating..." : "Create Client"}
                  </button>
                </div>
              </form>
            ) : (
              <div className="row g-3">
                <div className="col-12">
                  <div className="alert alert-success mb-0">
                    <div className="fw-semibold mb-1">Client created successfully</div>
                    <div className="small text-muted">
                      ID: <code>{result.client.id}</code>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="card h-100">
                    <div className="card-body">
                      <h6 className="card-title">Profile Link</h6>
                      <a href={result.profileUrl} target="_blank" rel="noreferrer">
                        {result.profileUrl}
                      </a>
                      <div className="mt-2">
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => navigator.clipboard?.writeText(result.profileUrl)}
                        >
                          Copy link
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="card h-100">
                    <div className="card-body text-center">
                      <h6 className="card-title">QR Code</h6>
                      <img
                        src={result.qrImage}
                        alt="QR"
                        style={{ maxWidth: "220px", width: "100%" }}
                      />
                      <div className="small text-muted mt-2">
                        Token: <code>{result.client.qrToken}</code>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="modal-footer">
            {!result ? (
              <button className="btn btn-secondary" onClick={closeAll}>Close</button>
            ) : (
              <>
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => {
                    setResult(null);
                    setForm(initial);
                  }}
                >
                  Add another
                </button>
                <button className="btn btn-primary" onClick={closeAll}>
                  Done
                </button>
              </>
            )}
          </div>
        </div>
      </div>

    
    {/* Backdrop */}
    <div className="modal-backdrop fade show" onClick={closeAll} aria-hidden="true" />
  </div>
  );
}
