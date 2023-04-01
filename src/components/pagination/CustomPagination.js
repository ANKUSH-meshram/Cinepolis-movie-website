import Pagination from "@mui/material/Pagination";

const customPagination = ({ setPage, numOfPages=10 }) => {
  const handlePageChange = (page) => {
    setPage(page);
    window.scroll(0, 0);
  };

  return (
    <div className="mt-14 mb-8">
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginTop: 10,
        }}
      >
        <Pagination
          onChange={(e) => handlePageChange(e.target.textContent)}
          count={numOfPages}
          color="primary"
          hideNextButton
          hidePrevButton
        />
      </div>
    </div>
  );
};

export default customPagination;
