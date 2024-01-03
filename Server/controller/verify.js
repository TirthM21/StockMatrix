import { decode } from "js-base64";
import User from "../model/User.js";

export const verifyToLogin = async (req, res) => {
  try {
    let { token } = req.params;
    console.log('Received token:', token);

    let decodedToken = decode(token);

    let user = await User.findOne({ _id: decodedToken });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found.",
      });
    }

    user = await User.findOneAndUpdate(
      { _id: decodedToken },
      {
        $set: {
          verified: true,
        },
      }
    );

    return res.status(200).send({
      success: true,
      message: "Successfully Verified.",
    });
  } catch (err) {
    console.error('Server Error:', err);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error.",
    });
  }
};
