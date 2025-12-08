import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { createClient } from "../api/clientApi";
import "./ClientForm.css";

const EMPTY = {
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
  expiryDate: "",
  address: "",
  googleMapLocation: "",
  complaintsAndSuggestions: "",
};

export default function ClientForm() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const initial = useMemo(() => state?.prefill ?? EMPTY, [state]);
  const [form, setForm] = useState(initial);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [created, setCreated] = useState(null); // { profileUrl, qrImage }

  useEffect(() => setForm(initial), [initial]);

  const update = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      // Use existing API helper and extract response body
      const res = await createClient(form);
      const body = res?.data ?? res; // handle both axios-resp and direct data
      if (!body) throw new Error("Empty response from server");
      setCreated({ profileUrl: body.profileUrl, qrImage: body.qrImage, client: body.client });
    } catch (err) {
      setError(err?.response?.data?.message || err.message || String(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="client-form-page">
      <h1 className="title">Add Client</h1>

      {error && (
        <div className="alert error">
          {error}
        </div>
      )}

      {created ? (
        <div className="success-card">
          <h2>Created ✅</h2>
          {created.profileUrl && (
            <p>
              Profile:&nbsp;
              <a href={created.profileUrl}>{created.profileUrl}</a>
            </p>
          )}
          {created.qrImage && (
            <div>
              <p>QR:</p>
              <img src={created.qrImage} alt="QR" className="qr-image" />
            </div>
          )}
          <div className="actions">
            <button className="btn ghost" onClick={() => navigate("/control-987")}>Back to Control</button>
          </div>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="client-form-card">
          <Field label="Client Name">
            <input className="input" value={form.clientName} onChange={(e) => update("clientName", e.target.value)} required />
          </Field>
          <Field label="Logo URL">
            <input className="input" value={form.logo} onChange={(e) => update("logo", e.target.value)} />
          </Field>
          <Field label="Image Upload">
            <input 
              className="input" 
              type="file" 
              accept="image/*" 
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    update("image", event.target?.result || "");
                  };
                  reader.readAsDataURL(file);
                }
              }} 
            />
            {form.image && (
              <div className="image-preview-container">
                <img src={form.image} alt="Preview" />
              </div>
            )}
          </Field>
          <Field label="First Name">
            <input className="input" value={form.firstName} onChange={(e) => update("firstName", e.target.value)} />
          </Field>
          <Field label="Last Name">
            <input className="input" value={form.lastName} onChange={(e) => update("lastName", e.target.value)} />
          </Field>
          <Field label="National ID">
            <input className="input" value={form.nationalId} onChange={(e) => update("nationalId", e.target.value)} />
          </Field>
          <Field label="Job Title">
            <input className="input" value={form.jobTitle} onChange={(e) => update("jobTitle", e.target.value)} />
          </Field>
          <Field label="Organization">
            <input className="input" value={form.organization} onChange={(e) => update("organization", e.target.value)} />
          </Field>

          <Field label="Services">
            <label style={{ marginRight: 8 }}>
              <input className="input" type="checkbox" checked={form.serviceOne} onChange={(e) => update("serviceOne", e.target.checked)} /> serviceOne
            </label>
            <label style={{ marginRight: 8 }}>
              <input className="input" type="checkbox" checked={form.serviceTwo} onChange={(e) => update("serviceTwo", e.target.checked)} /> serviceTwo
            </label>
            <label>
              <input className="input" type="checkbox" checked={form.serviceThree} onChange={(e) => update("serviceThree", e.target.checked)} /> serviceThree
            </label>
          </Field>

          <Field label="Expiry Date">
            <input className="input" type="date" value={form.expiryDate} onChange={(e) => update("expiryDate", e.target.value)} />
          </Field>

          <Field label="Address">
            <input className="input" value={form.address} onChange={(e) => update("address", e.target.value)} />
          </Field>
          <Field label="Google Map Location URL">
            <input className="input" value={form.googleMapLocation} onChange={(e) => update("googleMapLocation", e.target.value)} />
          </Field>
          <Field label="Complaints & Suggestions">
            <textarea className="textarea" value={form.complaintsAndSuggestions} onChange={(e) => update("complaintsAndSuggestions", e.target.value)} />
          </Field>

          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
            <button className="btn" type="submit" disabled={submitting}>{submitting ? "Saving..." : "Create Client"}</button>
            <button className="btn ghost" type="button" onClick={() => setForm(EMPTY)} disabled={submitting}>Clear</button>
          </div>
        </form>
      )}
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="form-field">
      <span className="field-label">{label}</span>
      {children}
    </label>
  );
}
