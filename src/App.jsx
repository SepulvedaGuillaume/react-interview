import { useEffect, useState } from "react";
import Select from "react-select";
import Movies from "./components/Movies";
import {
  fetchMovies,
  handleToggleLikeDislike,
  handleDelete,
} from "./movieActions";
import {
  getFilteredMovies,
  handleItemsPerPageChange,
  calculateTotalPages,
  itemsPerPageOptions,
} from "./pagination";
import Pagination from "./components/Pagination";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  useEffect(() => {
    const fetchData = async () => {
      const moviesData = await fetchMovies();
      setMovies(moviesData);

      const categoriesArray = moviesData.map((movie) => movie.category);
      const uniqueCategories = [...new Set(categoriesArray)];
      const categories = uniqueCategories.map((category) => ({
        value: category,
        label: category,
      }));
      setCategories(categories);
    };

    fetchData();
  }, []);

  const colourStyles = {
    option: (styles, { isFocused }) => {
      return {
        ...styles,
        backgroundColor: isFocused ? "hsl(0, 0%, 90%)" : null,
        color: "#333333",
      };
    },
  };

  return (
    <>
      <h1 className="text-4xl font-bold text-center my-8">React Interview</h1>
      <div className="container mx-auto flex flex-col justify-center items-center my-4">
        <div className="filter w-fit mb-4">
          <Select
            options={categories}
            onChange={(selectedCategories) =>
              setFilteredCategories(
                selectedCategories.map((category) => category.value)
              )
            }
            isSearchable
            isMulti
            name="categories"
            placeholder="Select categories ..."
            value={categories.filter((category) =>
              filteredCategories.includes(category.value)
            )}
            styles={colourStyles}
          />
        </div>
        <Movies
          movies={getFilteredMovies(
            movies,
            currentPage,
            itemsPerPage,
            filteredCategories
          )}
          handleToggleLikeDislike={(id, type) =>
            handleToggleLikeDislike(movies, id, type, setMovies)
          }
          handleDelete={handleDelete(
            movies,
            setMovies,
            filteredCategories,
            setFilteredCategories,
            setCategories,
            categories
          )}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={calculateTotalPages(movies, itemsPerPage)}
          handlePreviousPage={() =>
            setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
          }
          handleNextPage={() =>
            setCurrentPage((prevPage) =>
              Math.min(prevPage + 1, calculateTotalPages(movies, itemsPerPage))
            )
          }
          handleItemsPerPageChange={handleItemsPerPageChange(
            setItemsPerPage,
            setCurrentPage
          )}
          itemsPerPageOptions={itemsPerPageOptions}
          itemsPerPage={itemsPerPage}
          colourStyles={colourStyles}
        />
      </div>
    </>
  );
}
