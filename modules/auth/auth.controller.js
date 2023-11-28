const UserModel = require("../user/user.model");
const { generateOTP } = require("../../utils/auth");
const { sendSuccess, sendError } = require("../../utils/response");
const { generateJWT } = require("../../utils/jwt");
let unirest = require("unirest");
const adminModel = require("../user/admin.model");
const bcrypt = require('bcrypt');
const { uploadImageToS3 } = require("../images/images.controller");


class Controller {
  async sendOTP(reqe, res, next) {
    const { phone_number } = reqe.body;
    let otp = generateOTP();
    let user;
    try {
      user = await UserModel.findOneAndUpdate(
        {
          phone_number,
        },
        {
          phone_number,
          otp,
          provider: {
            name: "phone_number",
          },
        },
        { upsert: true, new: true }
      )
        .select("phone_number otp_verified ")
        .lean();
    } catch (err) {
      return next(err);
    }

    let req = unirest("GET", "https://www.fast2sms.com/dev/bulkV2");

    req.query({
      "authorization": process.env.SMS_API_KEY,
      "variables_values": otp,
      "route": "otp",
      "numbers": phone_number
    });

    req.headers({
      "cache-control": "no-cache"
    });
    req.end(function (res) {
      if (res.error) throw new Error(res.error);
      console.log(res.body);

    });
    return sendSuccess(res, {
      message: "OTP has been sent!",
      otp: otp,
      userrole: user.role,
    });
  }

  async verifyOTP(req, res, next) {
    const { phone_number, otp } = req.body;

    let user;
    try {
      user = await UserModel.findOne({ phone_number }).exec();
    } catch (err) {
      return next(err);
    }
    console.log('user', user)
    if (!user) {
      return res.status(400).json({
        message: "something is wrong ",
      });
    }
    if (parseInt(otp) !== user.otp) {
      return sendError(next, "Incorrect OTP", 401);
    }
    try {
      user = await UserModel.findByIdAndUpdate(
        user._id,
        { otp_verified: true, otp: null },
        { new: true }
      );
    } catch (err) {
      return next(err);
    }
    const token = generateJWT({ id: user._id });
    return sendSuccess(res, {
      token,
      account: user,
    });
  }



  async loginAdmin(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await adminModel.findOne({ email });
      if (!user) {
        return res.status(404).send('User not found');
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        const token = generateJWT({ id: user._id, email: user.email });
        return sendSuccess(res, {
          token,
          account: user,
        });
      } else {
        res.status(401).send('Incorrect password');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  async register(req, res, next) {
    const { _id } = req.user;
    const { email, name, age, gender, city, location } = req.body;
    if (!email || !name || !age || !gender || !city || !location) {
      return sendError(next, "please fill all fields", 401);
    }
    let account;
    try {
      let data = await UserModel.findById(_id)
      if (data) {
        let img = await uploadImageToS3(process.env.AWS_S3_BUCKET, req.file.originalname, req.file.buffer);
        let user = { ...req.body, image: img, phone_number: data.phone_number }
        account = await UserModel.findByIdAndUpdate(_id, user, { new: true })
        return sendSuccess(res, account, "User updated  successfully");
      } else {
        return sendSuccess(res, data, "User not exist");

      }
    } catch (err) {
      return next(err);
    }
  }


  async registerAdmin(req, res, next) {
    const { email, name, phone_number, age, gender, city, password } = req.body;
    if (!email || !name || !phone_number || !age || !gender || !city || !password) {
      return sendError(next, "please fill all fields", 401);
    }
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      let img = await uploadImageToS3(process.env.AWS_S3_BUCKET, req.file.originalname, req.file.buffer);
      const newUser = new adminModel({
        email,
        password: hashedPassword,
        image: img,
        name, phone_number, age, gender, city
      });

      // Save the user to the database
      let account = await newUser.save();

      return sendSuccess(res, account, "Admin created successfully");
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }



}

module.exports = new Controller();
