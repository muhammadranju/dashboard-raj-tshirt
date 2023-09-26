const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/userModel/user_model");
const Error = require("../../utils/throwError");

const loginGetController = async (req, res, next) => {
  res.status(200).render("pages/auth/login", { title: "Login", errros: {} });
};
const loginPostController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if ((!email, !password)) {
      throw Error("Email & Password is required ", 422, false);
    }
    const user = await User.findOne({ email });
    // const user = await User.find({
    //     $or: [{ username }, { email }],
    // });

    if (!user) {
      throw Error("Invalid Email or Password is incorrect", 401, false);
    }

    const macthPassword = await bcrypt.compare(password, user.password);
    if (!macthPassword) {
      throw Error("Invalid Email or Password is incorrect", 401, false);
    }
    const payload = {
      userId: user._id,
      username: user.username,
    };

    const token = jwt.sign(payload, process.env.JWT_KYE, {
      expiresIn: "1d",
    });
    res.cookie("access_token", token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.status(201).json({
      status: 201,
      statusText: true,
      token,
    });
  } catch (error) {
    next(error);
  }
};

const signupGetController = async (req, res, next) => {};
const signupPostController = async (req, res, next) => {
  try {
    const { username, name, email, password } = req.body;
    if ((!username, !name, !email, !password)) {
      throw Error("Input fields are required", 401, false);
    }
    const findEmail = await User.findOne({ email });
    if (findEmail) {
      throw Error("Email already exits", 422, false);
    }
    const salt = await bcrypt.genSalt(11);
    const hashPassword = await bcrypt.hash(password, salt);

    const user = await new User({
      username,
      name,
      email,
      password: hashPassword,
    });

    const payload = {
      userId: user._id,
      username: user.username,
    };
    const token = jwt.sign(payload, process.env.JWT_KYE, {
      expiresIn: "2h",
    });
    res.cookie("access_token", token, {
      maxAge: 120 * 60 * 1000,
      httpOnly: true,
    });
    await user.save();
    return res.status(201).json({ status: 201, statusText: true, user, token });
  } catch (error) {
    next(error);
  }
};

const logoutPostController = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

module.exports = {
  loginGetController,
  loginPostController,
  signupGetController,
  signupPostController,
  logoutPostController,
};
