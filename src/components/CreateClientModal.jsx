import { useEffect, useMemo, useState } from "react";
import { createClient } from "../api/clientApi";

const initial = {
  clientName: "",
  jobTitle: "",
  address: "",
  complaintsAndSuggestions: "",
  logo: "",
  image: "",
  nationalId: "",
  // keep the toggles/date if you still use them:
  serviceOne: false,
  serviceTwo: false,
  serviceThree: false,
  expiryDate: "",
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

  const canSubmit = useMemo(() => Boolean(form.clientName?.trim()), [form.clientName]);

  const update = (k, v) => setForm((s) => ({ ...s, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit || submitting) return;

    setSubmitting(true);
    setError("");

    // build a clean payload: never send firstName/lastName, convert "" -> undefined and drop empty keys
    const payload = Object.fromEntries(
      Object.entries(form)
        .filter(([k]) => !["firstName", "lastName"].includes(k))
        .map(([k, v]) => [k, v === "" ? undefined : v])
        .filter(([_, v]) => v !== undefined)
    );

    if (!payload.clientName?.trim()) {
      setError("clientName is required");
      setSubmitting(false);
      return;
    }

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
                  <label htmlFor="clientName" className="form-label fw-bold">
                    Client name <span className="text-danger">*</span>
                  </label>
                  <input
                    id="clientName"
                    name="clientName"
                    type="text"
                    className="form-control"
                    value={form.clientName}
                    onChange={(e) => setForm((f) => ({ ...f, clientName: e.target.value }))}
                    required
                    autoFocus
                    placeholder="e.g., Acme Corp"
                  />
                </div>

                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Job title</label>
                    <input className="form-control"
                      value={form.jobTitle}
                      onChange={(e) => setForm((f) => ({ ...f, jobTitle: e.target.value }))}
                      placeholder="e.g., Manager"
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Address</label>
                    <input className="form-control"
                      value={form.address}
                      onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                      placeholder="123 Main St"
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label">Complaints & suggestions</label>
                    <textarea className="form-control"
                      value={form.complaintsAndSuggestions}
                      onChange={(e) => setForm((f) => ({ ...f, complaintsAndSuggestions: e.target.value }))}
                      rows={2}
                      placeholder="How can we help?"
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Logo URL</label>
                    <input className="form-control"
                      value={form.logo}
                      onChange={(e) => setForm((f) => ({ ...f, logo: e.target.value }))}
                      placeholder="https://…/logo.png"
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Image URL</label>
                    <input className="form-control"
                      value={form.image}
                      onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
                      placeholder="https://…/photo.png"
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">National ID (optional)</label>
                    <input className="form-control"
                      value={form.nationalId}
                      onChange={(e) => setForm((f) => ({ ...f, nationalId: e.target.value }))}
                      placeholder="14 digits (optional)"
                      inputMode="numeric"
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Expiry Date</label>
                    <input
                      type="date"
                      className="form-control"
                      value={form.expiryDate}
                      onChange={(e) => setForm((f) => ({ ...f, expiryDate: e.target.value }))}
                    />
                  </div>
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
