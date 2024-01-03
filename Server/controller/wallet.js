import Wallet from "../model/Wallet.js";

export const getWallet = async (req, res) => {
  let success = false;
  try {
    let wallet = await Wallet.findOne({
      user_id: req.user.id,
    });

    success = true;

    return res.status(200).send({
      success,
      balance: wallet?.balance || 0,
    });
  } catch (err) {
    return res.status(500).send({
      success,
      message: "Internal Server Error.",
    });
  }
};
