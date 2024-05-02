import React, { useState, useEffect } from "react";
import { getMovies, deleteMovie } from "../api/api";

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMovies()
      .then((response) => {
        setMovies(response.data); // Mengambil data dari properti 'data' dalam respons
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, []);

  const loadMovies = async () => {
    try {
      const moviesData = await getMovies();
      setMovies(moviesData.data);
    } catch (error) {
      console.error("Failed to fetch movies:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteMovie(id);
      // Refresh movie list after deletion
      loadMovies();
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  return (
    <section className="py-3">
      <h2 className="flex justify-center text-2xl">List of Movies</h2>
      <div className="flex">
        {movies.map((movie, i) => (
          <div
            key={i}
            className="m-2 transform hover:scale-105 transition duration-300 ease-in-out">
            <div className="max-w-sm rounded overflow-hidden shadow-lg">
              <img src={movie.foto} alt={movie.judul} className="w-full h-60" />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 tracking-wider">{movie.judul}</div>
                <p className="font-light text-base">sutradara: {movie.sutradara || "Unknown"}</p>
                <p className="text-base">Rating: {movie.rating || "N/A"} / 10</p>
                <div className="">
                  <button className="px-5 py-2 rounded-xl bg-yellow-500 mr-5">edit</button>
                  <button
                    onClick={() => handleDelete(movie.id)}
                    className="px-5 py-2 rounded-xl bg-red-500">
                    delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MovieList;

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const MovieList = () => {
//   const [popularMovies, setMovies] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     axios
//       .get("/")
//       .then((response) => {
//         setMovies(response.data);
//         setIsLoading(false);
//         console.log();
//       })
//       .catch((error) => {
//         console.error("Error fetching movies:", error);
//         setIsLoading(false);
//       });
//   }, []);

//   return (
//     <div>
//       <h1>List of Movies</h1>
//       {isLoading ? (
//         <p>Loading...</p>
//       ) : popularMovies.length === 0 ? (
//         <p>No movies available.</p>
//       ) : (
//         <ul>
//           {popularMovies.map((movies, i) => (
//             <li key={i}>
//               <strong>Title:</strong> {movies.title}, <strong>Rating:</strong> {movies.rating},{" "}
//               <strong>Description:</strong> {movies.description}, <strong>Director:</strong>{" "}
//               {movies.director}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default MovieList;
