import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { createClient } from "../api/clientApi";

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
    <div style={{ padding: 24, maxWidth: 820 }}>
      <h1>Add Client</h1>

      {error && (
        <div style={{ background: "#fee", padding: 12, marginBottom: 16, border: "1px solid #f99" }}>
          {error}
        </div>
      )}

      {created ? (
        <div style={{ background: "#eefaf0", padding: 16, border: "1px solid #bde5c8" }}>
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
              <img src={created.qrImage} alt="QR" style={{ width: 180, height: 180 }} />
            </div>
          )}
          <div style={{ marginTop: 12 }}>
            <button onClick={() => navigate("/control-987")}>Back to Control</button>
          </div>
        </div>
      ) : (
        <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
          <Field label="Client Name">
            <input value={form.clientName} onChange={(e) => update("clientName", e.target.value)} required />
          </Field>
          <Field label="Logo URL">
            <input value={form.logo} onChange={(e) => update("logo", e.target.value)} />
          </Field>
          <Field label="Image URL">
            <input value={form.image} onChange={(e) => update("image", e.target.value)} />
          </Field>
          <Field label="First Name">
            <input value={form.firstName} onChange={(e) => update("firstName", e.target.value)} />
          </Field>
          <Field label="Last Name">
            <input value={form.lastName} onChange={(e) => update("lastName", e.target.value)} />
          </Field>
          <Field label="National ID">
            <input value={form.nationalId} onChange={(e) => update("nationalId", e.target.value)} />
          </Field>
          <Field label="Job Title">
            <input value={form.jobTitle} onChange={(e) => update("jobTitle", e.target.value)} />
          </Field>
          <Field label="Organization">
            <input value={form.organization} onChange={(e) => update("organization", e.target.value)} />
          </Field>

          <Field label="Services">
            <label style={{ marginRight: 8 }}>
              <input type="checkbox" checked={form.serviceOne} onChange={(e) => update("serviceOne", e.target.checked)} /> serviceOne
            </label>
            <label style={{ marginRight: 8 }}>
              <input type="checkbox" checked={form.serviceTwo} onChange={(e) => update("serviceTwo", e.target.checked)} /> serviceTwo
            </label>
            <label>
              <input type="checkbox" checked={form.serviceThree} onChange={(e) => update("serviceThree", e.target.checked)} /> serviceThree
            </label>
          </Field>

          <Field label="Expiry Date">
            <input type="date" value={form.expiryDate} onChange={(e) => update("expiryDate", e.target.value)} />
          </Field>

          <Field label="Address">
            <input value={form.address} onChange={(e) => update("address", e.target.value)} />
          </Field>
          <Field label="Google Map Location URL">
            <input value={form.googleMapLocation} onChange={(e) => update("googleMapLocation", e.target.value)} />
          </Field>
          <Field label="Complaints & Suggestions">
            <textarea value={form.complaintsAndSuggestions} onChange={(e) => update("complaintsAndSuggestions", e.target.value)} />
          </Field>

          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
            <button type="submit" disabled={submitting}>{submitting ? "Saving..." : "Create Client"}</button>
            <button type="button" onClick={() => setForm(EMPTY)} disabled={submitting}>Clear</button>
          </div>
        </form>
      )}
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label style={{ display: "grid", gap: 6 }}>
      <span style={{ fontWeight: 600 }}>{label}</span>
      {children}
    </label>
  );
}
