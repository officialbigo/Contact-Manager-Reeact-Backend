const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const app = express();

const cors = require("cors");

app.use(
  cors({
    origin: [
      // "http://localhost:3000",
      "https://trk-contact-manager.netlify.app",
      // "https://contact-manager-frontend-3k40.onrender.com/",
    ],
  })
);
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Private-Network", true);
  //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
  res.setHeader("Access-Control-Max-Age", 7200);

  next();
});

app.options("*", (req, res) => {
  console.log("preflight");
  if (
    req.headers.origin === "https://trk-contact-manager.netlify.app" &&
    allowMethods.includes(req.headers["access-control-request-method"]) &&
    allowHeaders.includes(req.headers["access-control-request-headers"])
  ) {
    console.log("pass");
    return res.status(204).send();
  } else {
    console.log("fail");
    allowMethods.includes(req.headers["access-control-request-method"]) &&
      allowHeaders.includes(req.headers["access-control-request-headers"]);
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
