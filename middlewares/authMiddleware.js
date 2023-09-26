const jwt = require("jsonwebtoken");
const Seller = require("../models/seller_model/seller_auth_model");
const User = require("../models/userModel/user_model");

const authMiddleware = async (req, res, next) => {
    try {
        let token = req.headers.authorization || req.cookies.access_token;
        // token = token.split(" ")[1];
        const { userId } = jwt.verify(token, process.env.JWT_KYE);
        if (!userId) {
            // return res.status(401).json({
            //     error: {
            //         status: 401,
            //         statusText: false,
            //         message: "Unauthorized Invalid token",
            //     },
            // });
            return res.redirect("/auth/login");
        }
        req.user = await User.findById(userId).select({
            password: 0,
            __v: 0,
        });
        return next();
    } catch (error) {
        // return res.status(401).json({
        //     error: {
        //         status: 401,
        //         statusText: false,
        //         message: "Invalid token from admin",
        //     },
        // });
        return res.redirect("/auth/login");
    }
};

const sellerMiddleware = async (req, res, next) => {
    try {
        let token = req.headers.authorization || req.cookies.access_token;
        // token = token.split(" ")[1];
        const { userId } = jwt.verify(token, process.env.JWT_KYE);
        if (!userId) {
            // return res.status(401).json({
            //     error: {
            //         status: 401,
            //         statusText: false,
            //         message: "Unauthorized Invalid token",
            //     },
            // });
            return res.status(400).redirect("/auth/login");
        }
        req.user = await Seller.findById(userId).select({
            password: 0,
            __v: 0,
        });
        return next();
    } catch (error) {
        // return res.status(401).json({
        //     error: {
        //         status: 401,
        //         statusText: false,
        //         message: "Invalid token from seller",
        //     },
        // });
        return res.redirect("/auth/login");
    }
};

module.exports = {
    authMiddleware,
    sellerMiddleware,
};
