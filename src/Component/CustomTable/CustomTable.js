import React, { useState, useEffect } from "react";

const CustomTable = () => {
  const [allData, setAllData] = useState([]);
  const [filterData, setFiletData] = useState([]);
  const [paginate, setPaginate] = useState(10);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Data Fetch
  useEffect(() => {
    const url = `https://api.razzakfashion.com/?paginate=${paginate}&page=${currentPage}&search=${search}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setFiletData(data.data);
        setAllData(data);
      });
  }, [paginate, currentPage, search]);

  //  Handle Time Format
  const formatDateTime = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  // Handle Search
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  // Handle Paginate
  const handleRowsPerPageChange = (e) => {
    setPaginate(e.target.value);
    setCurrentPage(1);
  };

  // Handle Next paginate
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  // Handle Previous paginate
  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <>
      <div>
        <h2 style={{ textAlign: "center" }}>Task 1</h2>
        {/* Search Input */}
        <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
          <input
            type="text"
            placeholder="Search by name"
            value={search}
            onChange={handleSearch}
            style={{ padding: "10px", fontSize: "14px" }}
          />
        </div>
      </div>

      <div>
        {/* User Table  */}
        <table aria-label="custom pagination table">
          <thead>
            <tr>
              <th scope="col">S.No</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Created</th>
              <th scope="col">Verified</th>
              <th scope="col">Updated</th>
            </tr>
          </thead>

          <tbody>
            {filterData.map((item) => (
              <tr key={item._id}>
                <td data-label="S.No.">{item.id}</td>
                <td data-label="Name">{item.name}</td>
                <td data-label="Email">{item.email}</td>
                <td data-label="Created"> {formatDateTime(item.created_at)}</td>
                <td data-label="Verified">
                  {" "}
                  {formatDateTime(item.email_verified_at)}
                </td>
                <td data-label="Updated"> {formatDateTime(item.updated_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Paginate  */}
        <div className="paginate-div">
          <div className="paginate-row-input-div">
            <p>Rows per page</p>
            <input
              type="number"
              value={paginate}
              onChange={handleRowsPerPageChange}
              style={{ padding: "10px", fontSize: "16px" }}
            />
          </div>

          <div className="paginate-page-number-div">
            <p>1</p>
            <p>-</p>
            <p>{allData.per_page}</p>
            <p>of</p>
            <p>{allData.last_page}</p>
          </div>

          <div className="paginate-page-arrow-div">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              style={{
                backgroundColor: "white",
                color: currentPage === 1 ? "#ccc" : "#000000",
                marginRight: "1rem",
              }}
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>

            <button
              onClick={handleNextPage}
              style={{
                backgroundColor: "white",
                color: "#000000",
              }}
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomTable;
