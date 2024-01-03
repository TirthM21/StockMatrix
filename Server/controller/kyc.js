import Kyc from "../model/Kyc.js";
import User from "../model/User.js";
import random from "../utils/randomHash.js";
import multer from "multer";
import fs from "fs";
import path from "path";

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    cb(null, `public/uploads`);
  },
  filename: async (req, file, cb) => {
    const uniqueName =
      random(5) + new Date().getTime() + "_" + file.originalname;
    cb(null, `${uniqueName}`);
  },
});

const upload = multer({
  storage,
  limits: { fieldSize: 1048576 * 10 },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      const err = new Error("Only .png, .jpg and .jpeg format allowed!");
      err.name = "ExtensionError";
      return cb(err);
    }
  },
}).fields([
  {
    name: "proof-1",
    maxCount: 2,
  },
  {
    name: "proof-2",
    maxCount: 2,
  },
]);

export const addKyc = async (req, res) => {
  let success = false;

  try {
    upload(req, res, async (err) => {
      const { id } = req.body;

      if (!req.files) {
        return res.status(400).send({
          success,
          message: "All fields required.",
        });
      }

      if (err) {
        console.log(err);
        return res.status(500).send({
          success,
          message: err.message,
        });
      }

      let kyc = await Kyc.findOne({ user_id: id });

      if (kyc) {
        return res.status(400).send({
          success,
          message: "KYC already done.",
        });
      }

      let poi = req.files["proof-1"][0].path.split("\\");
      let poa = req.files["proof-2"][0].path.split("\\");

      kyc = await Kyc.create({
        user_id: id,
        poi: poi[1] + "/" + poi[2],
        poa: poa[1] + "/" + poa[2],
      });

      success = true;

      return res.status(200).send({
        status: 200,
        success,
        message: "KYC Successfully added.",
      });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      success,
      message: "Internal Server Error.",
    });
  }
};

export const approveKyc = async (req, res) => {
  let success = false;
  try {
    const { id } = req.body;
    let kyc = await Kyc.findOne({ user_id: id });

    if (!kyc) {
      return res.status(400).send({
        success,
        message: "KYC Not Found.",
      });
    }

    kyc = await Kyc.findOneAndUpdate(
      { user_id: id },
      {
        $set: {
          status: true,
        },
      }
    );

    success = true;

    return res.status(200).send({
      success,
      message: "KYC approved.",
    });
  } catch (err) {
    return res.status(500).send({
      status: 500,
      message: "Internal Server Error.",
    });
  }
};

export const checkKYC = async (req, res) => {
  let success = false;

  try {
    const { id } = req.body;
    let kyc = await Kyc.findOne({ user_id: id });

    if (!kyc) {
      return res.status(404).send({
        success,
        message: "KYC Not Found.",
      });
    }

    if (kyc?.status !== true) {
      return res.status(400).send({
        success,
        message: "KYC Not Approved.",
      });
    }

    success = true;

    return res.status(200).send({
      success,
      kyc,
    });
  } catch (err) {
    return res.status(500).send({
      status: 500,
      message: "Internal Server Error.",
    });
  }
};
