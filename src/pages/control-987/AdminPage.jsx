import { useEffect, useMemo, useState } from "react";
import ClientsTable from "../../components/ClientsTable";
import { listClients, deleteClient, createClient } from "../../api/clientApi";
import "../../styles/admin.css";

const JOBS = ["All", "Doctor", "Engineer", "Accountant"];
const ITEMS_PER_PAGE = 20;

function AdminPage() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [searchTerm, setSearchTerm] = useState("");
  const [jobFilter, setJobFilter] = useState("All");
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [quickFirst, setQuickFirst] = useState("");
  const [quickLast, setQuickLast] = useState("");
  const [quickClientName, setQuickClientName] = useState("");
  const [creating, setCreating] = useState(false);

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

  const handleQuickCreate = async () => {
    if (creating) return;
    const payload = {
      firstName: quickFirst.trim() || undefined,
      lastName: quickLast.trim() || undefined,
      clientName: quickClientName.trim() || undefined,
    };

    // Require at least one name field
    if (!payload.firstName && !payload.lastName && !payload.clientName) return;

    setCreating(true);
    try {
      await createClient(payload);
      // Optionally you could inspect returned data; here we just reload
      await load(page);
      // reset quick add
      setQuickFirst("");
      setQuickLast("");
      setQuickClientName("");
      setShowQuickAdd(false);
    } catch (err) {
      console.error("Quick create failed:", err);
      // In a richer UI we would surface an error toast; keeping simple for now
    } finally {
      setCreating(false);
    }
  };

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
          <button
            className="btn btn-primary"
            onClick={() => setShowQuickAdd((s) => !s)}
          >
            {showQuickAdd ? "Close" : "+ Add Client"}
          </button>
        </div>
      </header>

      {showQuickAdd && (
        <div className="card mb-3">
          <div className="card-body">
            <div className="row g-2 align-items-center">
              <div className="col-md-4">
                <input
                  className="form-control"
                  placeholder="Client name (optional)"
                  value={quickClientName}
                  onChange={(e) => setQuickClientName(e.target.value)}
                />
              </div>
              <div className="col-md-3">
                <input
                  className="form-control"
                  placeholder="First name"
                  value={quickFirst}
                  onChange={(e) => setQuickFirst(e.target.value)}
                />
              </div>
              <div className="col-md-3">
                <input
                  className="form-control"
                  placeholder="Last name"
                  value={quickLast}
                  onChange={(e) => setQuickLast(e.target.value)}
                />
              </div>
              <div className="col-md-2 d-flex gap-2">
                <button
                  className="btn btn-gold"
                  disabled={creating || (!quickClientName && !quickFirst && !quickLast)}
                  onClick={handleQuickCreate}
                >
                  {creating ? "Creating..." : "Create"}
                </button>
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => {
                    setQuickFirst("");
                    setQuickLast("");
                    setQuickClientName("");
                    setShowQuickAdd(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
