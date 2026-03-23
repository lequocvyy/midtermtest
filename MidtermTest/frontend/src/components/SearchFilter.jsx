function SearchFilter({
  search,
  setSearch,
  category,
  setCategory,
  onSearch,
  onReset,
}) {
  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <div className="row g-3 align-items-center">
          <div className="col-md-5">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="col-md-4">
            <select
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="Phone">Phone</option>
              <option value="Laptop">Laptop</option>
            </select>
          </div>

          <div className="col-md-3 d-flex gap-2">
            <button className="btn btn-success w-100" onClick={onSearch}>
              Search
            </button>
            <button className="btn btn-outline-secondary w-100" onClick={onReset}>
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchFilter;