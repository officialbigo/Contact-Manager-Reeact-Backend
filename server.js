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
// app.use(cors());

// app.get("/cors", (req, res) => {
//   // res.set("Access-Control-Allow-Origin", "*");
//   res.send({ msg: "This has CORS enabled 🎈" });
// });
require("dotenv").config();
connectDb();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(`/api/contacts`, cors(), require("./routes/contactRoutes"));
app.use(`/api/users`, cors(), require("./routes/userRoutes"));
app.use(errorHandler);
app.listen(port, () => {
  console.log(`this is soo fun , I am in port ${port}`);
});
