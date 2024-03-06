import Select from "react-select";

export default function Pagination({
  currentPage,
  totalPages,
  handlePreviousPage,
  handleNextPage,
  handleItemsPerPageChange,
  itemsPerPageOptions,
  itemsPerPage,
  colourStyles,
}) {
  return (
    <div className="pagination-controls mt-6 flex flex-col items-center">
      <div className="flex content-center items-center mb-6">
        <button
          className={`text-white px-6 py-3 mx-2 rounded-md transition duration-300 ${
            currentPage === 1 ? "bg-gray-400" : "bg-indigo-500 hover:bg-indigo-600"
          }`}
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="mx-4 text-lg">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className={`text-white px-6 py-3 mx-2 rounded-md transition duration-300 ${
            currentPage === totalPages ? "bg-gray-400" : "bg-indigo-500 hover:bg-indigo-600"
          }`}
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
      <Select
        className="w-fit"
        options={itemsPerPageOptions}
        onChange={handleItemsPerPageChange}
        value={itemsPerPageOptions.find(
          (option) => option.value === itemsPerPage
        )}
        styles={colourStyles}
      />
    </div>
  );
}
