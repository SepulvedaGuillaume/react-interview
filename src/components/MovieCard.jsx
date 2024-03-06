export default function MovieCard({
  movie,
  handleToggleLikeDislike,
  handleDelete,
}) {
  return (
    <div
      key={movie.id}
      className="relative flex flex-col justify-center items-center border-solid border-2 border-white-500 bg-gray-800 pt-8 px-8 pb-10 m-4 shadow-lg rounded-md transform transition-transform duration-300 hover:scale-105"
    >
      <button
        className="absolute top-2 right-2 text-white hover:text-red-500 text-xl font-semibold transition duration-300 w-8 h-8"
        onClick={() => handleDelete(movie.id)}
      >
        X
      </button>
      <h2 className="text-3xl font-bold text-white mb-2 mt-4">{movie.title}</h2>
      <p className="text-xl font-semibold text-gray-300">{movie.category}</p>
      <div className="flex justify-between mt-4">
        <button
          className={`text-white px-6 py-3 mx-2 rounded-md hover:bg-green-600 transition duration-300 ${
            movie.isLiked ? "bg-green-500" : "bg-green-700"
          }`}
          onClick={() => handleToggleLikeDislike(movie.id, "like")}
        >
          {movie.likes > 1 ? `${movie.likes} Likes` : `${movie.likes} Like`}
        </button>
        <button
          className={`text-white px-6 py-3 mx-2 rounded-md hover:bg-red-600 transition duration-300 ${
            movie.isDisliked ? "bg-red-500" : "bg-red-700"
          }`}
          onClick={() => handleToggleLikeDislike(movie.id, "dislike")}
        >
          {movie.dislikes > 1
            ? `${movie.dislikes} Dislikes`
            : `${movie.dislikes} Dislike`}
        </button>
      </div>
    </div>
  );
}
