const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Seller = require("../../models/seller_model/seller_auth_model");
const Error = require("../../utils/throwError");
const sellerGetLoginController = async (req, res, next) => { };

const sellerPostLoginController = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if ((!email, !password)) {
            throw Error("Input fields are required", 400, false);
        }
        const user = await Seller.findOne({ email });
        if (!user) {
            throw Error("Email or Password is invalid", 400, false);
        }
        const macthPassword = await bcrypt.compare(password, user.password);
        if (!macthPassword) {
            throw Error("Email or Password is invalid", 400, false);
        }
        const payload = {
            userId: user._id,
        };
        const token = jwt.sign(payload, process.env.JWT_KYE, {
            expiresIn: "2h",
        });
        return res
            .status(200)
            .json({ message: { status: 200, success: true, token } });
    } catch (error) {
        next(error);
    }
};

const sellerGetSugnupController = async (req, res, next) => { };

const sellerPostSugnupController = async (req, res, next) => {
    try {
        const { name, email, password, gander, tc } = req.body;
        if ((!name, !email, !password, !gander, !tc)) {
            throw Error("Input fields are required", 400, false);
        }
        const findEmail = await Seller.findOne({ email });
        if (findEmail) {
            throw Error("Email alreday exits", 401, false);
        }
        const salt = await bcrypt.genSalt(11);
        const hasdPassword = await bcrypt.hash(password, salt);
        const newSeller = await Seller({
            name,
            email,
            password: hasdPassword,
            gander,
            tc,
        });
        await newSeller.save();
        return res.status(201).json(newSeller);
    } catch (error) {
        next(error);
    }
};

const sellerGetChangePasswordController = async (req, res, next) => {};
const sellerPostChangePasswordController = async (req, res, next) => {};

const sellerGetForgotPasswordController = async (req, res, next) => {};
const sellerPostForgotPasswordController = async (req, res, next) => {};

const sellerPostLogoutController = async (req, res, next) => {};

module.exports = {
    sellerGetLoginController,
    sellerPostLoginController,
    sellerGetSugnupController,
    sellerPostSugnupController,
    sellerGetChangePasswordController,
    sellerPostChangePasswordController,
    sellerGetForgotPasswordController,
    sellerPostForgotPasswordController,
    sellerPostLogoutController,
};
