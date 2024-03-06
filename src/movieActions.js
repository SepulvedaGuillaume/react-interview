import { movies$ } from "./movies";

export const fetchMovies = async () => {
  try {
    const moviesData = await movies$;
    return moviesData;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

export const updateCategories = (moviesData, categories) => {
  const remainingCategories = moviesData.map((movie) => movie.category);
  const uniqueRemainingCategories = [...new Set(remainingCategories)];
  return categories.filter((category) =>
    uniqueRemainingCategories.includes(category.value)
  );
};

export const handleToggleLikeDislike = (movies, id, type, setMovies) => {
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

export const handleDelete = (
  movies,
  setMovies,
  filteredCategories,
  setFilteredCategories,
  setCategories,
  categories
) => {
  return (id, category) => {
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
};
