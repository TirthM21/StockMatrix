import User from "../model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config.js";
import UserNominate from "../model/UserNominate.js";
import BankBalance from "../model/BankBalance.js";

// User Regitration
export const userRegister = async (req, res) => {
  let success = false;
  try {
    const { full_name, email, phone, password } = req.body.data;
    let user = await User.findOne({ "basic.email": email });

    if (user) {
      return res.status(400).send({
        success,
        message: "User already exists.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const securePassword = await bcrypt.hash(password, salt);

    user = await User.create({
      basic: {
        full_name,
        email,
        phone,
        password: securePassword,
      },
    });

    if (!user) {
      return res.status(400).send({
        success,
        messgae: "Some Error Occurred",
      });
    }

    success = true;

    return res.status(200).send({
      success,
      message: "User Registered Successfully.",
      user_id: user._id,
    });
  } catch (err) {
    return res.status(500).send({
      success,
      message: "Internal Server Error.",
    });
  }
};

// Add User Info
export const userInfo = async (req, res) => {
  let success = false;

  try {
    const {
      id,
      dob,
      pan,
      sourceWealth,
      accountNumber,
      accountType,
      ifsc,
      address,
      country,
    } = req.body.data;

    let user = await User.findOne({
      accountNumber,
    });

    if (user) {
      return res.status(400).send({
        success,
        message: "Account No. Already Exists.",
      });
    }

    if (!id) {
      return res.status(400).send({
        success,
        message: "Some Error Occurred.",
      });
    }

    await User.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          info: {
            dob,
            pan,
            sourceWealth,
            address,
          },
          bank: {
            accountNumber,
            accountType,
            ifsc,
            country,
          },
        },
      }
    );

    await BankBalance.create({
      user_id: id,
    });

    success = true;

    return res.status(200).send({
      success,
      message: "User Info added.",
    });
  } catch (err) {
    return res.status(500).send({
      success,
      message: "Internal Server Error.",
    });
  }
};

// User Login
export const userLogin = async (req, res) => {
  let success = false;

  try {
    const { email, password } = req.body.data;

    let user = await User.findOne({ "basic.email": email });

    if (!user) {
      return res.status(400).send({
        success,
        message: "User Not Found.",
      });
    }

    if (!user.verified) {
      return res.status(400).send({
        success,
        message: "Email not verified. Please verify to Login.",
      });
    }

    const comparePass = await bcrypt.compare(password, user.basic.password);

    if (!comparePass) {
      return res.status(400).send({
        success,
        message: "Invalid Credentials",
      });
    }

    let data = {
      user: {
        id: user.id,
      },
    };

    const token = jwt.sign(data, config.jwt_secret);

    success = true;

    return res.status(200).send({
      success,
      token,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      success,
      message: "Internal Server Error.",
    });
  }
};

// Get User
export const getUser = async (req, res) => {
  let success = false;

  try {
    const user = await User.findOne({ _id: req.user.id });
    if (!user) {
      return res.status(404).send({
        success,
        message: "User does not exists.",
      });
    }

    success = true;

    return res.status(200).send({
      success,
      user,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      success,
      message: "Internal Server Error.",
    });
  }
};

// Update Bank Details
export const updateBankDetails = async (req, res) => {
  let success = false;

  try {
    const { accountNumber, accountType, ifsc } = req.body;

    let user = await User.findOne({ _id: req.user.id });

    if (!user) {
      return res.status(404).send({
        success,
        message: "User does not exists.",
      });
    }

    user = await User.findOneAndUpdate(
      { _id: req.user.id },
      {
        $set: {
          "bank.accountNumber": accountNumber,
          "bank.accountType": accountType,
          "bank.ifsc": ifsc,
        },
      }
    );

    success = true;

    return res.status(200).send({
      success,
      message: "User Bank Details Updated.",
    });
  } catch (err) {
    return res.status(500).send({
      success,
      message: "Internal Server Error.",
    });
  }
};

// Update Info
export const updateUserInfo = async (req, res) => {
  let success = false;

  try {
    const { dob, pan, sourceWealth, address } = req.body;

    let user = await User.findOne({ _id: req.user.id });

    if (!user) {
      return res.status(404).send({
        success,
        message: "User does not exists.",
      });
    }

    user = await User.findOneAndUpdate(
      { _id: req.user.id },
      {
        $set: {
          "info.dob": dob,
          "info.pan": pan,
          "info.sourceWealth": sourceWealth,
          "info.address": address,
        },
      }
    );

    success = true;

    return res.status(200).send({
      success,
      message: "User info Updated.",
    });
  } catch (err) {
    return res.status(500).send({
      success,
      message: "Internal Server Error.",
    });
  }
};

// Update User
export const updateUser = async (req, res) => {
  let success = false;

  try {
    const { full_name, email, phone } = req.body;

    let user = await User.findOne({ _id: req.user.id });

    if (!user) {
      return res.status(404).send({
        success,
        message: "User does not exists.",
      });
    }

    user = await User.findOneAndUpdate(
      { _id: req.user.id },
      {
        $set: {
          "basic.full_name": full_name,
          "basic.email": email,
          "basic.phone": phone,
        },
      }
    );

    success = true;

    return res.status(200).send({
      success,
      message: "User Updated.",
    });
  } catch (err) {
    return res.status(500).send({
      success,
      message: "Internal Server Error.",
    });
  }
};

// Change Password
export const changePassword = async (req, res) => {
  let success = false;
  try {
    const { oldPassword, newPassword } = req.body;

    let user = await User.findOne({ _id: req.user.id });

    if (!user) {
      return res.status(404).send({
        success,
        message: "User does not exists.",
      });
    }

    if (oldPassword === newPassword) {
      return res.status(400).send({
        success,
        message: "Old Password and New Password are same.",
      });
    }

    let checkUserPassword = await bcrypt.compare(
      oldPassword,
      user.basic.password
    );

    if (!checkUserPassword) {
      return res.status(400).send({
        success,
        message: "Old Password does not match.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const securePassword = await bcrypt.hash(newPassword, salt);

    user = await User.findOneAndUpdate(
      { _id: req.user.id },
      {
        $set: {
          basic: {
            password: securePassword,
          },
        },
      }
    );

    success = true;

    return res.status(200).send({
      success,
      message: "User Password changed.",
    });
  } catch (err) {
    return res.status(500).send({
      success,
      message: "Internal Server Error.",
    });
  }
};

// User Nominate
export const addUserNomination = async (req, res) => {
  let success = false;

  try {
    const { id, relationship, name, dob, address } = req.body.data;

    let userNominate = await UserNominate.findOne({ user_id: id });

    if (userNominate) {
      return res.status(400).send({
        success,
        message: "Nominate Already exists.",
      });
    }

    userNominate = await UserNominate.create({
      user_id: id,
      nominate: {
        relationship,
        name,
        dob,
        address,
      },
    });

    success = true;

    return res.status(200).send({
      success,
      message: "User Nomination added.",
    });
  } catch (err) {
    return res.status(500).send({
      success,
      message: "Internal Server Error.",
    });
  }
};

// User Nominate
export const getSingleUserNominate = async (req, res) => {
  let success = false;

  try {
    const userNominate = await UserNominate.findOne({
      user_id: req.user.id,
    });

    if (!userNominate) {
      return res.status(404).send({
        success,
        message: "User Nominate Not Found",
      });
    }

    success = true;

    return res.status(200).send({
      success,
      userNominate,
    });
  } catch (err) {
    return res.status(500).send({
      success,
      message: "Internal Server Error.",
    });
  }
};

// User Nominate Update
export const updateUserNominate = async (req, res) => {
  let success = false;

  try {
    const { relationship, name, dob, address } = req.body;

    let userNominate = await UserNominate.findOne({
      user_id: req.user.id,
    });

    if (!userNominate) {
      return res.status(404).send({
        success,
        message: "User Nominate Not Found.",
      });
    }

    userNominate = await UserNominate.findOneAndUpdate(
      {
        user_id: req.user.id,
      },
      {
        $set: {
          "nominate.relationship": relationship,
          "nominate.name": name,
          "nominate.dob": dob,
          "nominate.address": address,
        },
      }
    );

    success = true;

    return res.status(200).send({
      success,
      message: "User Nominate updated.",
    });
  } catch (err) {
    return res.status(500).send({
      success,
      message: "Internal Server Error.",
    });
  }
};

// User Nominate Delete
export const deleteUserNominate = async (req, res) => {
  let success = false;

  try {
    let userNominate = await UserNominate.findOne({
      user_id: req.user.id,
    });

    if (!userNominate) {
      return res.status(400).send({
        success,
        message: "User Nominate Not Found.",
      });
    }

    userNominate = await UserNominate.findOneAndUpdate({
      user_id: req.user.id,
      _id: req.params.id,
    });

    success = true;

    return res.status(200).send({
      success,
      message: "User Nominate deleted.",
    });
  } catch (err) {
    return res.status(500).send({
      success,
      message: "Internal Server Error.",
    });
  }
};
