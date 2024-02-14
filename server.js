const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const app = express();

// const cors = require("cors");

// app.use(
//   cors({
//     origin: [
//       // "http://localhost:3000",
//       "https://trk-contact-manager.netlify.app",
//       // "https://contact-manager-frontend-3k40.onrender.com/",
//     ],
//   })
// );
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
//   );
//   res.setHeader("Access-Control-Allow-Credentials", true);
//   res.setHeader("Access-Control-Allow-Private-Network", true);
//   res.setHeader("Access-Control-Max-Age", 7200);

//   next();
// });

app.all("*", function (req, res, next) {
  console.log("fetching for request plus request in log tracker");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "PUT, POST, GET, DELETE, OPTIONS"
  );

  if (req.method == "OPTIONS") {
    // console.log(res.getHeaders());
    res.sendStatus(200);
  } else {
    next();
  }
});
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
