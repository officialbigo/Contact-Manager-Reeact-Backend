const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const app = express();

// {
//   origin: [
//     "http://localhost:3000",
//     "https://trk-contact-manager.netlify.app",
//     "https://contact1-manager-frontend-3k40.onrender.com",
//   ],
// }

const cors = require("cors");

app.use(cors());

require("dotenv").config();
connectDb();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(`/api/contacts`, require("./routes/contactRoutes"));
app.use(`/api/users`, require("./routes/userRoutes"));
app.use(errorHandler);

app.listen(port, () => {
  console.log(`this is soo fun , I am in port ${port}`);
});
