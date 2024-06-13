const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const app = express();
const fileUpload = require('express-fileupload')
const isAuthenticated = require('./middleware/AuthMiddlware')
const { NODE_ENV } = process.env;
const PORT = process.env.PORT || 3005;
const isDev = NODE_ENV;

// CORS Configuration
const corsOptions = {
  origin: ["http://localhost:3000"], // Your frontend origin
  credentials: true, // Allows cross-origin requests with credentials
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
};

if (isDev) {
  app.use(cors(corsOptions));
}
app.use(fileUpload())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware
app.use(express.json()); // Parse JSON bodies

// routes
app.use("/tarif", require("./routes/tarif.routes"));
app.use("/image-loisir", require("./routes/image-loisir.routes"));
app.use("/image-conference", require("./routes/image-conference.routes"));
app.use("/image-evenement", require("./routes/image-evenement.routes"));
app.use("/image-gastronomie", require("./routes/image-gastronomie.routes"));
app.use("/arrangement", require("./routes/arrangement.routes"));
app.use("/marche", require("./routes/marche.routes"));
app.use("/loisir", require("./routes/loisir.routes"));
app.use("/conference", require("./routes/conference.routes"));
app.use("/evenement", require("./routes/evenement.routes"));
app.use("/gastronomie", require("./routes/gastronomie.routes"));
app.use("/image-chambre", require("./routes/image-chambre.routes"));
app.use("/chambre", require("./routes/chambre.routes"));
app.use("/hotel", require("./routes/hotel.routes"));
app.use("/test", require("./routes/test.routes"));
app.use("/auth", require("./routes/auth.routes"));


app.post("/file-upload", isAuthenticated, (req, res) => {
  const file = req.files.file
  uploadPath = __dirname + '/uploads/' + file.name;
  file.mv(uploadPath, function(err) {
    if (err)
      return res.status(500).send(err);

    res.send({url: `${process.env.NODE_ENV === "development" ? process.env.API_URL_DEV : process.env.API_URL_PROD}/uploads/${file.name}`});
  });
})


// Start the server
app.listen(PORT, async () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
