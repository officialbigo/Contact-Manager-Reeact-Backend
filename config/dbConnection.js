const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");

const connectDb = asyncHandler(async () => {
  try {
    const connect = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log(
      "The connected server is",
      connect.connection.host,
      connect.connection.name
    );
  } catch {
    process.exit(1);
  }
});

module.exports = connectDb;
