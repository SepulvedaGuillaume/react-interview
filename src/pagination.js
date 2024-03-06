export const getFilteredMovies = (
  movies,
  currentPage,
  itemsPerPage,
  filteredCategories
) => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  if (filteredCategories.length === 0) {
    return movies.slice(startIndex, endIndex);
  } else {
    const filteredMovies = movies.filter((movie) =>
      filteredCategories.includes(movie.category)
    );

    return filteredMovies.slice(startIndex, endIndex);
  }
};

export const handleItemsPerPageChange =
  (setItemsPerPage, setCurrentPage) => (selectedOption) => {
    setItemsPerPage(selectedOption.value);
    setCurrentPage(1);
  };

export const calculateTotalPages = (movies, itemsPerPage) =>
  Math.ceil(movies.length / itemsPerPage);

export const itemsPerPageOptions = [
    { value: 4, label: "4 par page" },
    { value: 8, label: "8 par page" },
    { value: 12, label: "12 par page" },
  ];
