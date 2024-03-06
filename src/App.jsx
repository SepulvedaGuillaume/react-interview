import { movies$ } from "./movies";
import { useEffect, useState } from "react";
import Select from "react-select";
import Movies from "./components/Movies";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [categories, setCategories] = useState([]);

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
      }
    };

    fetchMovies();
  }, []);

  const handleDelete = (id) => {
    const newMovies = movies.filter((movie) => movie.id !== id);
    setMovies(newMovies);
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
    if (filteredCategories.length === 0) {
      return movies;
    } else {
      return movies.filter((movie) =>
        filteredCategories.includes(movie.category)
      );
    }
  };

  return (
    <>
      <h1 className="text-4xl font-bold text-center my-8">React Interview</h1>
      <div className="container mx-auto flex flex-col justify-center items-center">
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
            styles={colourStyles}
          />
        </div>
        <Movies
          movies={getFilteredMovies()}
          handleToggleLikeDislike={handleToggleLikeDislike}
          handleDelete={handleDelete}
        />
      </div>
    </>
  );
}
