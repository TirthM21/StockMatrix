import { encode } from "js-base64";
import User from "../model/User.js";
import transporter from "../utils/emailSend.js";
import template from "../utils/emailTemplate.js";
import config from "../config.js";

export const sendEmailLogin = async (req, res) => {
  let success = false;

  try {
    const { id } = req.params;

    let user = await User.findOne({ _id: id });

    let token = encode(user._id.toString());

    await transporter.sendMail({
      from: "stockmatrix7@gmail.com",
      to: user.basic.email,
      subject: "Verify your account with StockMatrix",
      html: template(
        "Thank you for choosing <b>StockMatrix</b> as your Investment Partner. Please Verify the email to login and start investing today.",
        `${config.react_url}/verify/${token}`
      ),
    });

    success = true;

    return res.status(200).send({
      success,
      message: "Email Successfully Sent.",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      success,
      message: "Internal Server Error.",
    });
  }
};
