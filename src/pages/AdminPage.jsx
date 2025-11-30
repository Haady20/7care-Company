import { useState, useMemo } from "react";
import ClientsTable from "../components/ClientsTable";
import ClientActionsPanel from "../components/ClientActionsPanel";

const JOBS = ["All", "Doctor", "Engineer", "Accountant"];

const INITIAL_CLIENTS = [
  {
    id: 1,
    firstName: "Ahmed",
    lastName: "Ali",
    nationalId: "12345678901234",
    job: "Doctor",
  },
  {
    id: 2,
    firstName: "Mona",
    lastName: "Hassan",
    nationalId: "98765432109876",
    job: "Engineer",
  },
];

const ITEMS_PER_PAGE = 20;

function AdminPage() {
  const [clients, setClients] = useState(INITIAL_CLIENTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [jobFilter, setJobFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedClient, setSelectedClient] = useState(null); 
  const [currentAction, setCurrentAction] = useState(null); 

  const filteredClients = useMemo(() => {
    return clients.filter((client) => {
      const fullName = `${client.firstName} ${client.lastName}`.toLowerCase();
      const matchesName = fullName.includes(searchTerm.toLowerCase());
      const matchesJob =
        jobFilter === "All" ? true : client.job === jobFilter;

      return matchesName && matchesJob;
    });
  }, [clients, searchTerm, jobFilter]);

  const totalPages = Math.ceil(filteredClients.length / ITEMS_PER_PAGE) || 1;

  const paginatedClients = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredClients.slice(startIndex, endIndex);
  }, [filteredClients, currentPage]);

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

  const handleAddClient = (newClientData) => {
    const newClient = {
      ...newClientData,
      id: Date.now(),
    };
    setClients((prev) => [...prev, newClient]);
    setCurrentAction(null);
    setSelectedClient(null);
    alert("Client added successfully!");
  };

  const handleUpdateClient = (updatedClient) => {
    setClients((prev) =>
      prev.map((c) => (c.id === updatedClient.id ? updatedClient : c))
    );
    setCurrentAction(null);
    setSelectedClient(null);
    alert("Client updated successfully!");
  };

  const handleConfirmDelete = (clientId) => {
    setClients((prev) => prev.filter((c) => c.id !== clientId));
    setCurrentAction(null);
    setSelectedClient(null);
    alert("Client deleted successfully!");
  };

  const handleCancelAction = () => {
    setCurrentAction(null);
    setSelectedClient(null);
  };

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">All Clients</h2>

      <ClientsTable
        clients={paginatedClients}
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

      <ClientActionsPanel
        action={currentAction}
        client={selectedClient}
        jobs={JOBS}
        onAddClient={handleAddClient}
        onUpdateClient={handleUpdateClient}
        onConfirmDelete={handleConfirmDelete}
        onCancel={handleCancelAction}
      />
    </div>
  );
}

export default AdminPage;
