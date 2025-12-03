function ClientsTable({
  clients,
  jobs,
  searchTerm,
  onSearchChange,
  jobFilter,
  onJobFilterChange,
  currentPage,
  totalPages,
  onPageChange,
  onAddClick,
  onEditClick,
  onDeleteClick,
}) {
  const handleSearchInput = (e) => {
    onSearchChange(e.target.value);
  };

  const handleJobChange = (e) => {
    onJobFilterChange(e.target.value);
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    onPageChange(page);
  };

  return (
    <div className="clients-wrapper">
      {/* Top toolbar */}
      <div className="clients-toolbar">
        <div className="clients-search-group">
          <label className="form-label mb-1 small text-muted">
            Search by name
          </label>
          <input
            type="text"
            className="form-control clients-search-input"
            placeholder="Type client name..."
            value={searchTerm}
            onChange={handleSearchInput}
          />
        </div>

        <div className="clients-filter-group">
          <label className="form-label mb-1 small text-muted">
            Filter by job
          </label>
          <select
            className="form-select clients-filter-select"
            value={jobFilter}
            onChange={handleJobChange}
          >
            {jobs.map((job) => (
              <option key={job} value={job}>
                {job}
              </option>
            ))}
          </select>
        </div>

        <div className="clients-add-group">
          <button className="btn btn-gold" onClick={onAddClick}>
            + Add Client
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="table-responsive clients-table-container">
        <table className="table table-hover align-middle mb-0 clients-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Full Name</th>
              <th>National ID</th>
              <th>Job</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center text-muted py-4">
                  No clients found.
                </td>
              </tr>
            ) : (
              clients.map((client, index) => (
                <tr key={client.id || index}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="client-name-cell">
                      <span className="client-avatar">
                        {(client.firstName?.[0] || "?") +
                          (client.lastName?.[0] || "")}
                      </span>
                      <div>
                        <div className="fw-semibold">
                          {client.firstName} {client.lastName}
                        </div>
                        <div className="small text-muted">
                          ID: {client.id || "-"}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{client.nationalId || "-"}</td>
                  <td>
                    <span className="badge rounded-pill bg-light text-dark client-job-badge">
                      {client.job || "—"}
                    </span>
                  </td>
                  <td className="text-end">
                    <button
                      className="btn btn-sm btn-outline-secondary me-2"
                      onClick={() => onEditClick(client)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => onDeleteClick(client)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="clients-pagination">
        <div className="text-muted small">
          Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
        </div>
        <div className="btn-group">
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={() => handlePageChange(currentPage - 1)}
          >
            ‹ Prev
          </button>
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next ›
          </button>
        </div>
      </div>
    </div>
  );
}

export default ClientsTable;
