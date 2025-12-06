import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ClientsTable from "../../components/ClientsTable";
import { listClients, deleteClient } from "../../api/clientApi";
import "../../styles/admin.css";

const JOBS = ["All", "Doctor", "Engineer", "Accountant"];
const ITEMS_PER_PAGE = 20;

const SAMPLE = {
  clientName: "Acme weCorp",
  logo: "https://exampl2e.com/logo.png",
  image: "https://exam2ple.com/photo.png",
  firstName: "2John",
  lastName: "Do2e",
  nationalId: "12345672823139",
  jobTitle: "Manager",
  organization: "A2cme Corp",
  serviceOne: true,
  serviceTwo: false,
  serviceThree: true,
  expiryDate: "2026-12-31",
  address: "123 2Main St",
  googleMapLocation: "https://maps.google.com/?q=123+Main+St",
  complaintsAndSuggestions: "Call support hotline",
};

function AdminPage() {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [searchTerm, setSearchTerm] = useState("");
  const [jobFilter, setJobFilter] = useState("All");
  // Quick-add removed in favor of full form route

  const load = async (p = 1) => {
    setLoading(true);
    try {
      const data = await listClients({ page: p, pageSize: ITEMS_PER_PAGE });
      setClients(Array.isArray(data.data) ? data.data : []);
      setPage(data.page ?? p);
      setTotalPages(data.totalPages ?? 1);
    } catch (e) {
      console.error("Failed to fetch clients:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const displayed = useMemo(() => {
    // Client-side search + filter over the *current page* results
    const term = searchTerm.trim().toLowerCase();
    return clients.filter((c) => {
      const fullName = `${c.firstName ?? ""} ${c.lastName ?? ""} ${c.clientName ?? ""}`.toLowerCase();
      const jobOk = jobFilter === "All" || (c.jobTitle ?? "").toLowerCase() === jobFilter.toLowerCase();
      const termOk =
        !term ||
        fullName.includes(term) ||
        (c.nationalId ?? "").toString().includes(term) ||
        (c.organization ?? "").toLowerCase().includes(term);
      return jobOk && termOk;
    });
  }, [clients, searchTerm, jobFilter]);

  const handleConfirmDelete = async (id) => {
    await deleteClient(id);
    // If this was the last item on the last page, you might want to shift page back:
    await load(Math.min(page, totalPages));
  };

  const handlePageChange = async (next) => {
    if (next >= 1 && next <= totalPages) {
      await load(next);
    }
  };

  // navigate to client form with a SAMPLE prefill
  const goToFormPrefilled = () => navigate("/clients/new", { state: { prefill: SAMPLE } });

  return (
    <div className="container py-4">
      <header className="d-flex align-items-center justify-content-between mb-3">
        <h1 className="h4 m-0">Clients</h1>
        <div className="d-flex gap-2">
          <input
            className="form-control"
            placeholder="Search by name, ID, or org..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: 280 }}
          />
          <select
            className="form-select"
            value={jobFilter}
            onChange={(e) => setJobFilter(e.target.value)}
            style={{ width: 160 }}
          >
            {JOBS.map((j) => (
              <option key={j} value={j}>
                {j}
              </option>
            ))}
          </select>
          <button className="btn btn-primary" onClick={goToFormPrefilled}>
            + Add Client
          </button>
        </div>
      </header>
      {/* Quick-add removed; Add Client now opens full form at /clients/new */}

      {loading ? (
        <div className="text-center py-5">Loading…</div>
      ) : (
        <ClientsTable
          clients={displayed}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          jobFilter={jobFilter}
          onJobFilterChange={setJobFilter}
          currentPage={page}
          totalPages={totalPages}
          itemsPerPage={ITEMS_PER_PAGE}
          onPageChange={handlePageChange}
          onEditClick={(client) => {/* open your edit form with client */}}
          onDeleteClick={(client) => handleConfirmDelete(client.id)}
        />
      )}

      {/* Modal-based creation removed in favor of inline quick-add. */}
    </div>
  );
}

export default AdminPage;
