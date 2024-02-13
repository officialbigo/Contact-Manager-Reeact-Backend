const asyncHandler = require("express-async-handler");
const User = require("../models/userModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//@desc sends the register input
//@route POST /api/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("all fields are manditory");
  }
  const checkUser = await User.findOne({ email });
  if (checkUser) {
    res.status(401);
    throw new Error("user with entered email already exists");
  }
  const encryptPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name: name,
    email: email,
    password: encryptPassword,
  });
  if (user) {
    res.status(200).json(user);
  } else {
    throw new Error("invalid detalis entered");
  }
});

//@desc sends the login input
//@route POST /api/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("all fields are mandatory");
  }
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30d" }
    );
    //Changed
    res.set("Access-Control-Allow-Origin", "*");
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("invalid username or password");
  }
});

//@desc post user details
//@route GET /api/user/
//@access private
const userDetails = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

//@desc delete user account
//@route DELETE /api/user/:id
//@access private
// const deleteAccount = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.params.id);
//   if (!user) {
//     res.status(404);
//     throw new Error("account not found");
//   }
//   res.status(200).json(user);
// });

module.exports = {
  registerUser,
  loginUser,
  userDetails,
};
