const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const app = express();

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// Koneksi ke Database
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // sesuaikan dengan user mysql
  password: "", //sesuaikan dengan password mysql
  database: "mahasiswa_db",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Koneksi Database Berhasil");
});

// Rute Untuk Halaman Utama (READ)
app.get("/", (req, res) => {
  const sql = "SELECT * FROM mahasiswa";
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.render("index", { mahasiswa: results });
  });
});

// Rute Untuk Menambahkan Mahasiswa (CREATE)
app.post("/tambah", (req, res) => {
  const { nim, nama, tempat_lahir, tanggal_lahir, jenis_kelamin, tahun_masuk } = req.body;
  const sql = "INSERT INTO mahasiswa (nim,nama,tempat_lahir,tanggal_lahir,jenis_kelamin,tahun_masuk) VALUES (?,?,?,?,?,?)";
  db.query(sql, [nim, nama, tempat_lahir, tanggal_lahir, jenis_kelamin, tahun_masuk], (err, result) => {
    if (err) throw err;
    res.redirect("/");
  });
});

// Rute Menampilkan Form Edit Mahasiswa
app.get("/edit/:id", (req, res) => {
  const sql = "SELECT * FROM mahasiswa WHERE id = ?";
  db.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.render("edit", { mahasiswa: result[0] });
  });
});

// Route Untuk Mengupdate data mahasiswa
// app.post("/edit/:id", (req, res) => {
//   const { nim, nama, tempat_lahir } = req.body;
//   const sql =
//     "UPDATE mahasiswa SET nim = ?, nama = ?, tanggal_lahir = ? WHERE id = ?";
//   db.query(sql, [nim, nama, tempat_lahir], (err, result) => {
//     if (err) throw err;
//     res.redirect("/");
//   });
// });
app.post("/edit/:id", (req, res) => {
  const { nim, nama, tempat_lahir, tanggal_lahir, jenis_kelamin, tahun_masuk } = req.body;
  const sql =
    "UPDATE mahasiswa SET nim = ?, nama = ?, tempat_lahir = ?, tanggal_lahir = ?, jenis_kelamin = ?, tahun_masuk = ? WHERE id = ?";
  db.query(sql, [nim, nama, tempat_lahir, tanggal_lahir, jenis_kelamin, tahun_masuk, req.params.id], (err, result) => {
    if (err) {
      console.error("Error updating data:", err);
      return res.send("Error updating data.");
    }
    res.redirect("/");
  });
});

// Rute Untuk Menghapus Database (Delete)
app.get("/hapus/:id", (req, res) => {
  const sql = "DELETE FROM mahasiswa where id = ?";
  db.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.redirect("/");
  });
});

// Menjalankan Server
app.listen(3000, () => {
  console.log("Server ini berjalan di http://localhost:3000");
});
