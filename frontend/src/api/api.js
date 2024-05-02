import axios from "axios";

// Fungsi untuk mengambil daftar film dari backend
export const getMovies = async () => {
  try {
    const response = await axios.get("http://localhost:5000/"); // Sesuaikan URL dengan endpoint API Anda
    return response.data; // Kembalikan data dari respons API
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

// Fungsi untuk mencari film berdasarkan judul
export const searchMovies = async (query) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/movies/filter?judul=${query}`); // Sesuaikan URL dengan endpoint API pencarian Anda
    return response.data; // Kembalikan data dari respons API
  } catch (error) {
    console.error("Error searching for movies:", error);
    throw error;
  }
};

export const deleteMovie = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:5000/api/movies/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting movie:", error);
    throw error;
  }
};
