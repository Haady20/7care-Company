import { useState, useMemo, useEffect } from "react";
import ClientsTable from "../../components/ClientsTable";
import ClientActionsPanel from "../../components/ClientActionsPanel";
import { listClients } from "../../api/clientApi";
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

  // Fetch one page from the server
  useEffect(() => {
    let cancelled = false;
    async function run() {
      try {
        setLoading(true);
        setError(null);
        const { data, totalPages: apiTotalPages } = await listClients({
          page: currentPage,
          pageSize: ITEMS_PER_PAGE,
        });
        if (!cancelled) {
          setClients(data.map(mapApiClientToUi));
          setTotalPages(apiTotalPages || 1);
        }
      } catch (e) {
        if (!cancelled) setError(e.message || "Failed to load clients");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    run();
    return () => { cancelled = true; };
  }, [currentPage]);

  // Optional client-side filtering for current page results
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

  // Handlers
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
    setCurrentAction("edit");
    setSelectedClient(client);
  };

  const handleDeleteClick = (client) => {
    setCurrentAction("delete");
    setSelectedClient(client);
  };

  // MOCK ADD
  const handleAddClient = (newClientData) => {
    const fakeId = Math.floor(Math.random() * 999999);

    const uiClient = {
      id: fakeId,
      firstName: newClientData.firstName,
      lastName: newClientData.lastName,
      job: newClientData.job,
      nationalId: newClientData.nationalId,
    };

    setClients((prev) => [...prev, uiClient]);
    setCurrentAction(null);
    setSelectedClient(null);
  };

  // MOCK UPDATE
  const handleUpdateClient = (updatedClient) => {
    setClients((prev) =>
      prev.map((c) => (c.id === updatedClient.id ? updatedClient : c))
    );
    setCurrentAction(null);
    setSelectedClient(null);
  };

  // MOCK DELETE
  const handleConfirmDelete = (clientId) => {
    setClients((prev) => prev.filter((c) => c.id !== clientId));
    setCurrentAction(null);
    setSelectedClient(null);
  };

  const handleCancelAction = () => {
    setCurrentAction(null);
    setSelectedClient(null);
  };

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

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-logo">
          {/* تقدر هنا تحط <img src="/7care-banner.png" /> لو عايز */}
          <span className="logo-7">7</span>
          <span className="logo-text">care</span>
        </div>

        <nav className="admin-nav">
          <button className="admin-nav-item active">Clients</button>
          {/* <button className="admin-nav-item">Reports</button>
          <button className="admin-nav-item">Settings</button> */}
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

        {/* Table + Actions */}
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

// import { useState, useMemo, useEffect } from "react";
// import ClientsTable from "../components/ClientsTable";
// import ClientActionsPanel from "../components/ClientActionsPanel";
// import {
//   fetchClients,
//   createClient,
//   updateClient,
//   deleteClient,
//   getClientQrPngUrl,
// } from "../api/clientApi";

// const JOBS = ["All", "Doctor", "Engineer", "Accountant"];
// const ITEMS_PER_PAGE = 20;

// // Map backend client → shape expected by table/forms
// function mapApiClientToUi(apiClient) {
//   return {
//     ...apiClient,
//     // frontend uses `job`, backend uses `jobTitle`
//     job: apiClient.jobTitle || apiClient.job || "",
//   };
// }

// function AdminPage() {
//   const [clients, setClients] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [jobFilter, setJobFilter] = useState("All");
//   const [currentPage, setCurrentPage] = useState(1);

//   const [selectedClient, setSelectedClient] = useState(null);
//   const [currentAction, setCurrentAction] = useState(null);

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // last created client → show QR code for them
//   const [lastCreatedClient, setLastCreatedClient] = useState(null);

//   // Load clients from backend on mount
//   useEffect(() => {
//     async function loadClients() {
//       try {
//         setLoading(true);
//         setError(null);
//         const apiClients = await fetchClients();
//         const mapped = apiClients.map(mapApiClientToUi);
//         setClients(mapped);
//       } catch (err) {
//         console.error(err);
//         setError(err.message || "Failed to load clients");
//       } finally {
//         setLoading(false);
//       }
//     }

//     loadClients();
//   }, []);

//   const filteredClients = useMemo(() => {
//     return clients.filter((client) => {
//       const fullName = `${client.firstName || ""} ${
//         client.lastName || ""
//       }`.toLowerCase();
//       const matchesName = fullName.includes(searchTerm.toLowerCase());
//       const matchesJob = jobFilter === "All" ? true : client.job === jobFilter;

//       return matchesName && matchesJob;
//     });
//   }, [clients, searchTerm, jobFilter]);

//   const totalPages = Math.ceil(filteredClients.length / ITEMS_PER_PAGE) || 1;

//   const paginatedClients = useMemo(() => {
//     const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
//     const endIndex = startIndex + ITEMS_PER_PAGE;
//     return filteredClients.slice(startIndex, endIndex);
//   }, [filteredClients, currentPage]);

//   const handleSearchChange = (value) => {
//     setSearchTerm(value);
//     setCurrentPage(1);
//   };

//   const handleJobFilterChange = (value) => {
//     setJobFilter(value);
//     setCurrentPage(1);
//   };

//   const handleAddClick = () => {
//     setCurrentAction("add");
//     setSelectedClient(null);
//   };

//   const handleEditClick = (client) => {
//     setCurrentAction("edit");
//     setSelectedClient(client);
//   };

//   const handleDeleteClick = (client) => {
//     setCurrentAction("delete");
//     setSelectedClient(client);
//   };

//   // ADD → call backend POST /api/clients and update state
//   const handleAddClient = async (newClientData) => {
//     try {
//       const payload = {
//         // backend requires clientName – use full name
//         clientName: `${newClientData.firstName} ${
//           newClientData.lastName
//         }`.trim(),
//         firstName: newClientData.firstName,
//         lastName: newClientData.lastName,
//         nationalId: newClientData.nationalId,
//         jobTitle: newClientData.job,
//         // include the file if provided
//         image: newClientData.image || null,
//       };

//       // result: { client, profileUrl, qrImage }
//       const result = await createClient(payload);
//       const apiClient = result.client || result;

//       const uiClient = {
//         ...mapApiClientToUi(apiClient),
//         profileUrl: result.profileUrl,
//         qrImage: result.qrImage,
//       };

//       setClients((prev) => [...prev, uiClient]);
//       setLastCreatedClient(uiClient); // show its QR code
//       setCurrentAction(null);
//       setSelectedClient(null);
//       alert("Client added successfully!");
//     } catch (err) {
//       console.error(err);
//       alert(err.message || "Failed to add client");
//     }
//   };

//   // UPDATE → call backend PUT /api/clients/:id
//   const handleUpdateClient = async (updatedClient) => {
//     try {
//       const payload = {
//         clientName: `${updatedClient.firstName} ${updatedClient.lastName}`.trim(),
//         firstName: updatedClient.firstName,
//         lastName: updatedClient.lastName,
//         nationalId: updatedClient.nationalId,
//         jobTitle: updatedClient.job,
//       };

//       const apiClient = await updateClient(updatedClient.id, payload);
//       const uiClient = mapApiClientToUi(apiClient);

//       setClients((prev) => prev.map((c) => (c.id === uiClient.id ? uiClient : c)));
//       setCurrentAction(null);
//       setSelectedClient(null);
//       alert("Client updated successfully!");
//     } catch (err) {
//       console.error(err);
//       alert(err.message || "Failed to update client");
//     }
//   };

//   // DELETE → call backend DELETE /api/clients/:id
//   const handleConfirmDelete = async (clientId) => {
//     try {
//       await deleteClient(clientId);
//       setClients((prev) => prev.filter((c) => c.id !== clientId));
//       setCurrentAction(null);
//       setSelectedClient(null);
//       alert("Client deleted successfully!");
//     } catch (err) {
//       console.error(err);
//       alert(err.message || "Failed to delete client");
//     }
//   };

//   const handleCancelAction = () => {
//     setCurrentAction(null);
//     setSelectedClient(null);
//   };

//   if (loading) {
//     return (
//       <div className="container py-4">
//         <h2 className="text-center mb-4">All Clients</h2>
//         <p>Loading clients...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="container py-4">
//         <h2 className="text-center mb-4">All Clients</h2>
//         <p className="text-danger">Error: {error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="container py-4">
//       <h2 className="text-center mb-4">All Clients</h2>

//       <ClientsTable
//         clients={paginatedClients}
//         jobs={JOBS}
//         searchTerm={searchTerm}
//         onSearchChange={handleSearchChange}
//         jobFilter={jobFilter}
//         onJobFilterChange={handleJobFilterChange}
//         currentPage={currentPage}
//         totalPages={totalPages}
//         onPageChange={setCurrentPage}
//         onAddClick={handleAddClick}
//         onEditClick={handleEditClick}
//         onDeleteClick={handleDeleteClick}
//       />

//       <ClientActionsPanel
//         action={currentAction}
//         client={selectedClient}
//         jobs={JOBS}
//         onAddClient={handleAddClient}
//         onUpdateClient={handleUpdateClient}
//         onConfirmDelete={handleConfirmDelete}
//         onCancel={handleCancelAction}
//       />

//       {/* QR preview for the last created client */}
//       {lastCreatedClient && (
//         <div className="mt-4">
//           <h4>
//             QR Code for {lastCreatedClient.firstName} {" "}
//             {lastCreatedClient.lastName}
//           </h4>
//           <img
//             src={getClientQrPngUrl(lastCreatedClient.qrToken)}
//             alt="Client QR code"
//             style={{ width: 200, height: 200 }}
//           />
//           {lastCreatedClient.profileUrl && (
//             <p className="mt-2">
//               <small>Profile URL: {lastCreatedClient.profileUrl}</small>
//             </p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default AdminPage;