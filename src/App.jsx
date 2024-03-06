import { useEffect, useState } from "react";
import { movies$ } from "./movies";
import Select from "react-select";
import Movies from "./components/Movies";
import Pagination from "./components/Pagination";
import LoadingSpinner from "./components/LoadingSpinner";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const moviesData = await movies$;
        setMovies(moviesData);

        const categoriesArray = moviesData.map((movie) => movie.category);
        const uniqueCategories = [...new Set(categoriesArray)];
        const categories = uniqueCategories.map((category) => ({
          value: category,
          label: category,
        }));
        setCategories(categories);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
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

  const getFilteredMovies = () => {
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

  const handleToggleLikeDislike = (id, type) => {
    const updatedMovies = movies.map((movie) => {
      if (movie.id === id) {
        if (type === "like" && !movie.isLiked && !movie.isDisliked) {
          return { ...movie, likes: movie.likes + 1, isLiked: true };
        } else if (type === "dislike" && !movie.isLiked && !movie.isDisliked) {
          return { ...movie, dislikes: movie.dislikes + 1, isDisliked: true };
        } else if (type === "like" && !movie.isLiked && movie.isDisliked) {
          return {
            ...movie,
            likes: movie.likes + 1,
            dislikes: movie.dislikes - 1,
            isLiked: true,
            isDisliked: false,
          };
        } else if (type === "dislike" && movie.isLiked && !movie.isDisliked) {
          return {
            ...movie,
            dislikes: movie.dislikes + 1,
            likes: movie.likes - 1,
            isDisliked: true,
            isLiked: false,
          };
        }
      }
      return movie;
    });
    setMovies(updatedMovies);
  };

  const handleDelete = (id, category) => {
    const newMovies = movies.filter((movie) => movie.id !== id);
    setMovies(newMovies);

    if (
      filteredCategories.includes(category) &&
      newMovies.every((movie) => movie.category !== category)
    ) {
      const updatedFilteredCategories = filteredCategories.filter(
        (selectedCategory) => selectedCategory !== category
      );
      setFilteredCategories(updatedFilteredCategories);
    } else if (
      filteredCategories.length > 0 &&
      newMovies.every((movie) => !filteredCategories.includes(movie.category))
    ) {
      setFilteredCategories([]);
    }

    const updatedCategories = updateCategories(newMovies, categories);
    setCategories(updatedCategories);
  };

  const updateCategories = (moviesData, categories) => {
    const remainingCategories = moviesData.map((movie) => movie.category);
    const uniqueRemainingCategories = [...new Set(remainingCategories)];
    return categories.filter((category) =>
      uniqueRemainingCategories.includes(category.value)
    );
  };

  const handleItemsPerPageChange =
    (setItemsPerPage, setCurrentPage) => (selectedOption) => {
      setItemsPerPage(selectedOption.value);
      setCurrentPage(1);
    };

  const calculateTotalPages = (movies, itemsPerPage) =>
    Math.ceil(movies.length / itemsPerPage);

  return (
    <>
      <h1 className="text-4xl font-bold text-center my-8">React Interview</h1>
      {loading ? (
        <LoadingSpinner />
      ) : (
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
            movies={getFilteredMovies()}
            handleToggleLikeDislike={handleToggleLikeDislike}
            handleDelete={handleDelete}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={calculateTotalPages(movies, itemsPerPage)}
            handlePreviousPage={() =>
              setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
            }
            handleNextPage={() =>
              setCurrentPage((prevPage) =>
                Math.min(
                  prevPage + 1,
                  calculateTotalPages(movies, itemsPerPage)
                )
              )
            }
            handleItemsPerPageChange={handleItemsPerPageChange(
              setItemsPerPage,
              setCurrentPage
            )}
            itemsPerPage={itemsPerPage}
            colourStyles={colourStyles}
          />
        </div>
      )}
    </>
  );
}
