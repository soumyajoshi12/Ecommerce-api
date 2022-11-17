const { validate } = require("../models/userModel");
const userModel = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const {sendEmail} = require("../utils/sendEmail");

// Register a User
exports.registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const user = await userModel.create({
      name,
      email,
      password,
      avatar: {
        public_id: "this is a sample id",
        url: "profilepicUrl",
      },
    });
    sendToken(user, 201, res);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

//Login User
exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //cheaking if user have given password and email both

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please Enter Email & Password",
      });
    }

    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isPasswordMatched = user.comparePassword(password);

    if (!isPasswordMatched) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    sendToken(user, 200, res);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Logout User
exports.logout = async (req, res, next) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: "Logged Out",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Forfot Pasword
exports.forgotPassword = async (req, res, next) => {
  const user = await userModel.findOne({ email: req.body.email });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User Not Founnd",
    });
  }

  // get ResetPassword Token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${resetToken}`;

  const message = `Your password reset token is :- \n\n${resetPasswordUrl}\n\n if you have not requested this email then , please ignore it `;

  try {
    await sendEmail({
      email: user.email,
      subject: "Robbin Password recovery",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email send to ${user.email} successfully`,
    });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExipire = undefined;

    await user.save({ validateBeforSave: false });

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
