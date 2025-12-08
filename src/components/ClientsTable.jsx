import { useMemo } from "react";
import { apiFetch } from "../api/client";

function formatDate(iso, locale = "en-GB") {
  try {
    return new Date(iso).toLocaleString(locale, {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Africa/Cairo",
    });
  } catch {
    return "-";
  }
}

const fallbackAvatar =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"><rect width="100%" height="100%" fill="#ddd"/><text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="14" fill="#666">N/A</text></svg>`
  );

function Avatar({ src, alt }) {
  return (
    <img
      src={src || fallbackAvatar}
      onError={(e) => {
        e.currentTarget.src = fallbackAvatar;
      }}
      alt={alt}
      width={40}
      height={40}
      loading="lazy"
      style={{ objectFit: "cover", borderRadius: 8, background: "#f1f1f1" }}
    />
  );
}

function ServiceBadges({ one, two, three }) {
  const items = [
    { label: "S1", active: !!one },
    { label: "S2", active: !!two },
    { label: "S3", active: !!three },
  ];
  return (
    <div className="d-flex gap-1">
      {items.map((i, idx) => (
        <span
          key={idx}
          className={`badge ${i.active ? "bg-success" : "bg-secondary"}`}
          title={i.active ? "Enabled" : "Disabled"}
        >
          {i.label}
        </span>
      ))}
    </div>
  );
}

function ClientsTable({
  clients,
  searchTerm,
  onSearchChange,
  jobFilter,
  onJobFilterChange,
  currentPage,
  totalPages,
  itemsPerPage,
  onPageChange,
  onAddClick,
  onEditClick,
  onDeleteClick,
}) {
  const rows = useMemo(() => clients ?? [], [clients]);

  const handleNameClick = async (clientId) => {
    try {
      const baseURL =
        process.env.REACT_APP_API_BASE_URL || "http://localhost:3000/api";
      const qrUrl = `${baseURL}/clients/${clientId}/qr.pdf`;

      // Fetch the QR code PDF with token
      const response = await apiFetch(qrUrl);

      if (!response.ok) {
        throw new Error(`Failed to download QR code: ${response.statusText}`);
      }

      // Create a blob and trigger download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `qr-code-${clientId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading QR code:", error);
      alert("Failed to download QR code. Please try again.");
    }
  };

  const canPrev = currentPage > 1;
  const canNext = currentPage < totalPages;

  return (
    <div className="card">
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th style={{ width: 56 }}></th>
                <th>Name</th>
                {/* Job Title column removed */}
                <th>National ID</th>
                <th>Registered</th>
                <th>Services</th>
                <th style={{ width: 140 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  {/* colSpan updated from 7 to 6 after removing Job Title */}
                  <td colSpan="6" className="text-center py-5">
                    No clients found.
                  </td>
                </tr>
              ) : (
                rows.map((c) => {
                  const fullName =
                    c.clientName ||
                    `${c.firstName ?? ""} ${c.lastName ?? ""}`.trim();
                  return (
                    <tr key={c.id}>
                      <td>
                        <Avatar src={c.image} alt={fullName} />
                      </td>
                      <td>
                        <div className="fw-semibold">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              handleNameClick(c.id);
                            }}
                            style={{
                              background: "none",
                              border: "none",
                              color: "inherit",
                              textDecoration: "none",
                              cursor: "pointer",
                              transition: "color 0.2s",
                              padding: 0,
                              font: "inherit",
                            }}
                            onMouseEnter={(e) =>
                              (e.target.style.color = "#0d6efd")
                            }
                            onMouseLeave={(e) =>
                              (e.target.style.color = "inherit")
                            }
                            title="Click to download QR code"
                          >
                            {fullName || "-"}
                          </button>
                        </div>
                        {c.organization && (
                          <div className="text-muted small">
                            {c.organization}
                          </div>
                        )}
                      </td>
                      {/* Job Title cell removed */}
                      <td style={{ wordBreak: "break-all" }}>
                        {c.nationalId ?? "-"}
                      </td>
                      <td>
                        {c.registrationDate
                          ? formatDate(c.registrationDate)
                          : "-"}
                      </td>
                      <td>
                        <ServiceBadges
                          one={c.serviceOne}
                          two={c.serviceTwo}
                          three={c.serviceThree}
                        />
                      </td>
                      <td>
                        <div className="d-flex gap-2">
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => onEditClick?.(c)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => onDeleteClick?.(c)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="d-flex justify-content-between align-items-center px-3 py-2 border-top">
          <div className="text-muted small">
            Showing up to <strong>{itemsPerPage}</strong> per page
          </div>
          <div className="d-flex align-items-center gap-2">
            <button
              className="btn btn-sm btn-outline-secondary"
              disabled={!canPrev}
              onClick={() => onPageChange(currentPage - 1)}
            >
              ‹ Prev
            </button>
            <span className="small">
              Page <strong>{currentPage}</strong> of{" "}
              <strong>{totalPages}</strong>
            </span>
            <button
              className="btn btn-sm btn-outline-secondary"
              disabled={!canNext}
              onClick={() => onPageChange(currentPage + 1)}
            >
              Next ›
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientsTable;
