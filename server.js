const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
// const cors = require(`cors`);
const app = express();

// const allowedOrigins = [
//   "https://https://contact-manager-frontend-3k40.onrender.com",
// ];

// const corsOptions = {
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   optionsSuccessStatus: 200,
// };

// app.use(
//   cors({
//     origin: "*",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//   })
// );

// app.use(
//   cors({
//     origin: [
//       `https://contact-manager-frontend-3k40.onrender.com`,
//       `https://contact-manager-frontend-3k40.onrender.com/`,
//     ],
//     preflightContinue: true,
//   })
// );

// const corsOptions = {
//   credentials: true,
//   origin: ["*"],
// };
// app.use(cors(corsOptions));

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
// app.post("/sample", (req, res) => {
//   const body = req.body;
//   console.log(body);
//   res.send("ok");
// });
// app.use("/api", (req, res) => {
//   res.send("working");
// });
app.use(`/api/contacts`, require("./routes/contactRoutes"));
app.use(`/api/users`, require("./routes/userRoutes"));
app.use(errorHandler);
app.listen(port, () => {
  console.log(`this is soo fun , I am in port ${port}`);
});
