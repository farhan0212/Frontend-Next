const express = require("express");
const bodyParser = require("body-parser");
const koneksi = require("./config/database");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// Set body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set static file directory
app.use(express.static("./public"));

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "./public/images/");
  },
  filename: (req, file, callBack) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    callBack(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// halaman utama menampilkan semua film
app.get("/", (req, res) => {
  const querySql = "SELECT * FROM movies";

  koneksi.query(querySql, (err, rows) => {
    if (err) {
      console.error("Failed to fetch data:", err);
      return res.status(500).json({ success: false, message: "Failed to fetch data!", error: err });
    }
    res.status(200).json({ success: true, data: rows });
  });
});

// Create data / insert data
app.post("/api/movies", upload.single("image"), (req, res) => {
  const { judul, rating, deskripsi, sutradara } = req.body;
  const foto = req.file ? "http://localhost:5000/images/" + req.file.filename : null;

  const querySql =
    "INSERT INTO movies (judul, rating, deskripsi, sutradara, foto) VALUES (?, ?, ?, ?, ?)";

  koneksi.query(querySql, [judul, rating, deskripsi, sutradara, foto], (err, rows, field) => {
    if (err) {
      console.error("Failed to insert data:", err);
      return res
        .status(500)
        .json({ success: false, message: "Failed to insert data!", error: err });
    }

    res.status(201).json({ success: true, message: "Successfully inserted data" });
  });
});

// Read data / get data
app.get("/api/movies/filter", (req, res) => {
  const judul = req.query.judul;
  const querySql = "SELECT * FROM movies WHERE judul LIKE ?";
  const param = "%" + judul + "%";

  koneksi.query(querySql, [param], (err, rows) => {
    if (err) {
      console.error("Failed to fetch data:", err);
      return res.status(500).json({ success: false, message: "Failed to fetch data!", error: err });
    }
    console.log("Successfully fetched data");
    res.status(200).json({ success: true, data: rows });
  });
});

app.put("/api/movies/:id", upload.single("image"), (req, res) => {
  const id = req.params.id;
  const { judul, rating, deskripsi, sutradara } = req.body;
  let foto = null;

  // Jika ada file yang diupload, update nama file
  if (req.file) {
    foto = req.file.filename;
  }

  // Update data film dalam database
  koneksi.query(
    "UPDATE movies SET judul = ?, rating = ?, deskripsi = ?, sutradara = ?, foto = ? WHERE id = ?",
    [judul, rating, deskripsi, sutradara, foto, id],
    (error, results) => {
      if (error) {
        console.error("Gagal memperbarui data film:", error);
        return res
          .status(500)
          .json({ success: false, message: "Gagal memperbarui data film", error: error });
      }

      if (results.affectedRows === 0) {
        console.log("Data tidak ditemukan");
        return res.status(404).json({ success: false, message: "Data tidak ditemukan" });
      }

      console.log("Berhasil memperbarui data film");
      res.status(200).json({ success: true, message: "Berhasil memperbarui data film" });
    }
  );
});
// Delete data
app.delete("/api/movies/:id", (req, res) => {
  const id = req.params.id;

  const queryDelete = "DELETE FROM movies WHERE id = ?";

  koneksi.query(queryDelete, id, (err, result) => {
    if (err) {
      console.error("Failed to delete data:", err);
      return res
        .status(500)
        .json({ success: false, message: "Failed to delete data!", error: err });
    }
    if (result.affectedRows === 0) {
      console.log("Data not found");
      return res.status(404).json({ success: false, message: "Data not found" });
    }
    console.log("Successfully deleted data");
    res.status(200).json({ success: true, message: "Successfully deleted data" });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at port: ${PORT}`);
});
