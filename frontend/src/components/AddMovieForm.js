import React, { useState } from "react";

const AddMovieForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    rating: "",
    description: "",
    director: "",
    image: null, // New state for the image
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] }); // Store the selected image file
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataWithImage = new FormData(); // Create a FormData object
    formDataWithImage.append("title", formData.title);
    formDataWithImage.append("rating", formData.rating);
    formDataWithImage.append("description", formData.description);
    formDataWithImage.append("director", formData.director);
    formDataWithImage.append("image", formData.image); // Append the image file to FormData

    onSubmit(formDataWithImage); // Pass FormData object to onSubmit function

    setFormData({
      title: "",
      rating: "",
      description: "",
      director: "",
      image: null, // Reset image state after form submission
    });
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl mb-4">Add Movie</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-400"
        />
        <input
          type="number"
          name="rating"
          placeholder="Rating"
          value={formData.rating}
          onChange={handleChange}
          className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-400"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-400"
        />
        <input
          type="text"
          name="director"
          placeholder="Director"
          value={formData.director}
          onChange={handleChange}
          className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-400"
        />
        <input
          type="file" // Input type file for selecting images
          name="image"
          accept="image/*" // Allow only image files
          onChange={handleChange}
          className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-400"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
          Add Movie
        </button>
      </form>
    </div>
  );
};

export default AddMovieForm;
