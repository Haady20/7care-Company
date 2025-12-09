import { useEffect, useMemo, useState } from "react";
import ClientsTable from "../../components/ClientsTable";
import ClientActionsPanel from "../../components/ClientActionsPanel";
import {
  listClients,
  deleteClient,
  createClient,
  updateClient
} from "../../api/clientApi";

import { useAuth } from "../../auth/AuthContext";
import { useNavigate } from "react-router-dom";   

import "../../styles/admin.css";

const JOBS = ["All", "Doctor", "Engineer", "Accountant"];
const ITEMS_PER_PAGE = 20;

function AdminPage() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const [searchTerm, setSearchTerm] = useState("");
  const [jobFilter, setJobFilter] = useState("All");

  const [showCreate, setShowCreate] = useState(false);
  const [creating, setCreating] = useState(false);
  const [created, setCreated] = useState(null);

  const [currentAction, setCurrentAction] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);

  const [error, setError] = useState(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // ------------------------------------
  // LOAD DATA
  // ------------------------------------
  const load = async (p = 1) => {
    setLoading(true);
    try {
      const data = await listClients({ page: p, pageSize: ITEMS_PER_PAGE });
      setClients(Array.isArray(data.data) ? data.data : []);
      setPage(data.page ?? p);
      setTotalPages(data.totalPages ?? 1);
      setTotal(data.total ?? 0);
    } catch (e) {
      console.error("Failed to fetch clients:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load(1);
  }, []);

  // ------------------------------------
  // FILTER
  // ------------------------------------
  const displayed = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return clients.filter((c) => {
      const fullName = `${c.firstName ?? ""} ${c.lastName ?? ""} ${c.clientName ?? ""}`.toLowerCase();

      const jobOk =
        jobFilter === "All" ||
        (c.jobTitle ?? "").toLowerCase() === jobFilter.toLowerCase();

      const termOk =
        !term ||
        fullName.includes(term) ||
        (c.nationalId ?? "").includes(term) ||
        (c.organization ?? "").toLowerCase().includes(term);

      return jobOk && termOk;
    });
  }, [clients, searchTerm, jobFilter]);

  // ------------------------------------
  // DELETE
  // ------------------------------------
  const handleConfirmDelete = async (id) => {
    await deleteClient(id);
    await load(Math.min(page, totalPages));
  };

  // ------------------------------------
  // PAGINATION
  // ------------------------------------
  const handlePageChange = async (next) => {
    if (next >= 1 && next <= totalPages) {
      await load(next);
    }
  };

  // ------------------------------------
  // ADD CLIENT
  // ------------------------------------
  const handleQuickAdd = async (payload) => {
    try {
      setError(null);
      setCreating(true);

      const { data } = await createClient(payload);
      setCreated(data);

      await load(1);
      setShowCreate(false);
    } catch (e) {
      console.error(e);
      setError(e?.response?.data?.message || "Failed to create client");
    } finally {
      setCreating(false);
    }
  };

  // ------------------------------------
  // EDIT CLIENT
  // ------------------------------------
  const handleOpenEdit = (client) => {
    setSelectedClient(client);
    setCurrentAction("edit");
  };

  const handleApplyEdit = async (id, updatedData) => {
    try {
      await updateClient(id, updatedData);
      await load(page);

      setCurrentAction(null);
      setSelectedClient(null);
    } catch (e) {
      console.error("Update failed:", e);
      alert("Failed to update client");
    }
  };

  const handleCancelAction = () => {
    setSelectedClient(null);
    setCurrentAction(null);
  };
  
  return (
    <div className="login-page-center">
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
              onClick={() => setShowCreate((v) => !v)}
              disabled={creating}
            >
              {showCreate ? "Close" : "+ Add Client"}
            </button>

            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </header>

        {error && <div className="alert alert-danger">{error}</div>}

        {created && (
          <div className="alert alert-success d-flex flex-column gap-2">
            <div>
              Client created:{" "}
              <strong>
                {created?.client?.firstName} {created?.client?.lastName}
              </strong>
            </div>

            {created?.profileUrl && (
              <div>
                Profile:{" "}
                <a href={created.profileUrl} target="_blank" rel="noreferrer">
                  {created.profileUrl}
                </a>
              </div>
            )}

            {created?.qrImage && (
              <div>
                <img src={created.qrImage} alt="QR" style={{ height: 120 }} />
              </div>
            )}

            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() => setCreated(null)}
            >
              Dismiss
            </button>
          </div>
        )}

        {showCreate && (
          <div className="mb-3">
            <ClientActionsPanel
              action="add"
              jobs={JOBS}
              onAddClient={handleQuickAdd}
              onCancel={() => setShowCreate(false)}
            />
          </div>
        )}

        {currentAction === "edit" && selectedClient && (
          <div className="mb-3">
            <ClientActionsPanel
              action="edit"
              client={selectedClient}
              jobs={JOBS}
              onUpdateClient={handleApplyEdit}
              onCancel={handleCancelAction}
            />
          </div>
        )}

        {loading ? (
          <div className="text-center py-5">Loading…</div>
        ) : (
          <>
            <div className="mb-3 text-end">
              <span className="badge bg-secondary">Total clients: {total}</span>
            </div>

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
              onEditClick={handleOpenEdit}
              onDeleteClick={(client) => handleConfirmDelete(client.id)}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default AdminPage;
