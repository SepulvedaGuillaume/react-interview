export default function MovieCard({
  movie,
  handleToggleLikeDislike,
  handleDelete,
}) {
  return (
    <div
      key={movie.id}
      className="flex flex-col justify-center items-center bg-gray-800 p-4 m-4 shadow-md rounded-md transform transition-transform duration-500 hover:scale-105"
    >
      <h2 className="text-2xl font-bold text-white">{movie.title}</h2>
      <p className="text-sm text-gray-400">{movie.category}</p>
      <div className="flex justify-between mt-4">
        <button
          className={`text-white px-4 py-2 mx-2 rounded-md ${
            movie.isLiked ? "bg-green-500" : "bg-green-700 "
          }`}
          onClick={() => handleToggleLikeDislike(movie.id, "like")}
        >
          {movie.likes > 1 ? `${movie.likes} Likes` : `${movie.likes} Like`}
        </button>
        <button
          className={`text-white px-4 py-2 mx-2 rounded-md ${
            movie.isDisliked ? "bg-red-500" : "bg-red-700"
          }`}
          onClick={() => handleToggleLikeDislike(movie.id, "dislike")}
        >
          {movie.dislikes > 1
            ? `${movie.dislikes} Dislikes`
            : `${movie.dislikes} Dislike`}
        </button>
      </div>
      <div className="mt-4">
        <button
          className="bg-gray-600 text-white px-4 py-2 mx-2 rounded-md"
          onClick={() => handleDelete(movie.id)}
        >
          Supprimer
        </button>
      </div>
    </div>
  );
}
