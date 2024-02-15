require("dotenv").config();
const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const app = express();

const cors = require("cors");

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://trk-contact-manager.netlify.app",
    ],
  })
);

connectDb();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(`/api/contacts`, require("./routes/contactRoutes"));
app.use(`/api/users`, require("./routes/userRoutes"));
app.use(errorHandler);

app.listen(port, () => {
  console.log(`this is soo fun , I am in port ${port}`);
});
