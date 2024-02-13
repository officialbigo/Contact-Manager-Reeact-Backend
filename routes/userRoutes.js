const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/validateTokenHandler");
const accessControlAllowOrigin = require("../middleware/accessControlAllowOrigin");

const {
  registerUser,
  userDetails,
  loginUser,
} = require("../controllers/userController");

router.use(accessControlAllowOrigin);

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/user", validateToken, userDetails);

module.exports = router;
