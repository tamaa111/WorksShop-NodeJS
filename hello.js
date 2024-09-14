//Import module HTTP dari Node.js
const http = require("http");

//Tentukan port yang akan digunakan
const port = 80;

// Buat Server
const server = http.createServer((req, res) => {
  // Atur header respons
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");

  // Tampilkan pesan "Hello World"
  res.end("Hello World\n");
});

//Jalankan server di port yang telah ditentukan
server.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}/`);
});
