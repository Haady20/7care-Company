import { useState, useMemo, useEffect } from "react";
import ClientsTable from "../../components/ClientsTable";
import ClientActionsPanel from "../../components/ClientActionsPanel";

import {
  listClients,
  createClient,
  updateClient,
  deleteClient,
} from "../../api/clientApi";

import "../../styles/admin.css";

const JOBS = ["All", "Doctor", "Engineer", "Accountant"];
const ITEMS_PER_PAGE = 20;

function mapApiClientToUi(apiClient) {
  return {
    ...apiClient,
    job: apiClient.job || apiClient.jobTitle || "",
  };
}

function AdminPage() {
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [jobFilter, setJobFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [selectedClient, setSelectedClient] = useState(null);
  const [currentAction, setCurrentAction] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ------------------ FETCH CLIENTS ------------------
  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const result = await listClients({
          page: currentPage,
          pageSize: ITEMS_PER_PAGE,
        });

        if (!cancelled) {
          setClients(result.data.map(mapApiClientToUi));
          setTotalPages(result.totalPages || 1);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Failed to load clients");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [currentPage]);

  // ------------------ LOCAL FILTERING ------------------
  const filteredClients = useMemo(() => {
    return clients.filter((client) => {
      const fullName = `${client.firstName || ""} ${
        client.lastName || ""
      }`.toLowerCase();

      const matchesName = fullName.includes(searchTerm.toLowerCase());
      const matchesJob = jobFilter === "All" ? true : client.job === jobFilter;

      return matchesName && matchesJob;
    });
  }, [clients, searchTerm, jobFilter]);

  // ------------------ ACTION HANDLERS ------------------
  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleJobFilterChange = (value) => {
    setJobFilter(value);
    setCurrentPage(1);
  };

  const handleAddClick = () => {
    setCurrentAction("add");
    setSelectedClient(null);
  };

  const handleEditClick = (client) => {
    setSelectedClient(client);
    setCurrentAction("edit");
  };

  const handleDeleteClick = (client) => {
    setSelectedClient(client);
    setCurrentAction("delete");
  };

  // ----------- ADD CLIENT (REAL API) -----------
  const handleAddClient = async (newClientData) => {
    try {
      const res = await createClient(newClientData);
      const added = mapApiClientToUi(res.data.client);

      setClients((prev) => [...prev, added]);
      setCurrentAction(null);
      setSelectedClient(null);
    } catch (err) {
      alert("Failed to add client: " + err.message);
    }
  };

  // ----------- UPDATE CLIENT (REAL API) -----------
  const handleUpdateClient = async (clientData) => {
    try {
      const res = await updateClient(clientData.id, clientData);
      const updated = mapApiClientToUi(res.data);

      setClients((prev) =>
        prev.map((c) => (c.id === clientData.id ? updated : c))
      );

      setCurrentAction(null);
      setSelectedClient(null);
    } catch (err) {
      alert("Failed to update client: " + err.message);
    }
  };

  // ----------- DELETE CLIENT (REAL API) -----------
  const handleConfirmDelete = async (clientId) => {
    try {
      await deleteClient(clientId);

      setClients((prev) => prev.filter((c) => c.id !== clientId));

      setCurrentAction(null);
      setSelectedClient(null);
    } catch (err) {
      alert("Failed to delete: " + err.message);
    }
  };

  const handleCancelAction = () => {
    setCurrentAction(null);
    setSelectedClient(null);
  };

  // ------------------ LOADING UI ------------------
  if (loading) {
    return (
      <div className="admin-layout">
        <aside className="admin-sidebar">
          <div className="admin-logo">
            <span className="logo-7">7</span>
            <span className="logo-text">care</span>
          </div>
        </aside>
        <main className="admin-main">
          <header className="admin-header-skeleton" />
          <div className="admin-loading">Loading clients...</div>
        </main>
      </div>
    );
  }

  // ------------------ ERROR UI ------------------
  if (error) {
    return (
      <div className="admin-layout">
        <aside className="admin-sidebar">
          <div className="admin-logo">
            <span className="logo-7">7</span>
            <span className="logo-text">care</span>
          </div>
        </aside>
        <main className="admin-main">
          <header className="admin-header card-shadow">
            <div>
              <h1 className="admin-title">Admin Dashboard</h1>
              <p className="admin-subtitle">Manage your clients</p>
            </div>
          </header>
          <div className="alert alert-danger mt-4">Error: {error}</div>
        </main>
      </div>
    );
  }

  // ------------------ MAIN UI ------------------
  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <span className="logo-7">7</span>
          <span className="logo-text">care</span>
        </div>

        <nav className="admin-nav">
          <button className="admin-nav-item active">Clients</button>
        </nav>

        <div className="admin-sidebar-footer">
          <p className="mb-0 small text-muted">
            Logged in as <strong>Admin</strong>
          </p>
        </div>
      </aside>

      {/* Main content */}
      <main className="admin-main">
        {/* Header */}
        <header className="admin-header card-shadow">
          <div>
            <h1 className="admin-title">Clients Overview</h1>
            <p className="admin-subtitle">
              Search, filter and manage all 7care clients from one place.
            </p>
          </div>

          <div className="admin-header-stats">
            <div className="stat-card">
              <span className="stat-label">Total Clients</span>
              <span className="stat-value">{clients.length}</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Filtered</span>
              <span className="stat-value">{filteredClients.length}</span>
            </div>
          </div>
        </header>

        {/* Table */}
        <section className="admin-content">
          <div className="admin-card card-shadow">
            <ClientsTable
              clients={filteredClients}
              jobs={JOBS}
              searchTerm={searchTerm}
              onSearchChange={handleSearchChange}
              jobFilter={jobFilter}
              onJobFilterChange={handleJobFilterChange}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              onAddClick={handleAddClick}
              onEditClick={handleEditClick}
              onDeleteClick={handleDeleteClick}
            />
          </div>

          {/* Action Panel (Add / Edit / Delete) */}
          <ClientActionsPanel
            action={currentAction}
            client={selectedClient}
            jobs={JOBS}
            onAddClient={handleAddClient}
            onUpdateClient={handleUpdateClient}
            onConfirmDelete={handleConfirmDelete}
            onCancel={handleCancelAction}
          />
        </section>
      </main>
    </div>
  );
}

export default AdminPage;
