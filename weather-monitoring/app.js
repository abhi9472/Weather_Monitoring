
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const weatherRoutes = require("./routes/weatherRoutes"); 
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5002; 


app.use(cors());
app.use(express.json());


mongoose
  .connect(process.env.MONGODB_URI, {
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));


  app.use("/api/weather", weatherRoutes);

  app.use("/api/weather", (req, res, next) => {
    console.log(`Received request on ${req.method} ${req.path}`);
    next();
  });
  

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
