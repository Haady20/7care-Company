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
  const handleSearchInputChange = (e) => {
    onSearchChange(e.target.value);
  };

  const handleJobFilterChange = (e) => {
    onJobFilterChange(e.target.value);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="mb-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex gap-2">
          <input
            type="text"
            className="form-control"
            placeholder="search by name"
            value={searchTerm}
            onChange={handleSearchInputChange}
          />
          <button className="btn btn-secondary" type="button">
            Search
          </button>
        </div>

        <button className="btn btn-primary" type="button" onClick={onAddClick}>
          Add Client
        </button>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>National ID</th>
            <th>
              Job
              <select
                className="form-select form-select-sm d-inline-block ms-2"
                style={{ width: "auto" }}
                value={jobFilter}
                onChange={handleJobFilterChange}
              >
                {jobs.map((job) => (
                  <option key={job} value={job}>
                    {job}
                  </option>
                ))}
              </select>
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">
                No clients found.
              </td>
            </tr>
          ) : (
            clients.map((client) => (
              <tr key={client.id}>
                <td>{client.firstName}</td>
                <td>{client.lastName}</td>
                <td>{client.nationalId}</td>
                <td>{client.job}</td>
                <td>
                  <button
                    className="btn btn-sm btn-outline-primary me-2"
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

      <div className="d-flex justify-content-between align-items-center">
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <div className="btn-group">
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default ClientsTable;
