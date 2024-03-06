import MovieCard from "./MovieCard";

export default function Movies({
  movies,
  handleToggleLikeDislike,
  handleDelete,
}) {
  return (
    <div className="flex flex-wrap justify-center items-center">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          handleToggleLikeDislike={handleToggleLikeDislike}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
}
