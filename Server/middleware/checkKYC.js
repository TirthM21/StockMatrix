import Kyc from "../model/Kyc.js";

const checkKyc = async (req, res, next) => {
  let success = false;

  try {
    let kyc = await Kyc.findOne({ user_id: req.user.id });

    if (!kyc.status) {
      return res.status(406).send({
        success,
        message: "KYC not verified.",
      });
    }

    next();
  } catch (err) {
    return res.status(500).send({
      status: 500,
      message: "Internal Server Error.",
    });
  }
};

export default checkKyc;
