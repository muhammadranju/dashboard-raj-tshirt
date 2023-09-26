const User = require("../../models/userModel/user_model");
const AdminAddress = require("../../models/adminModel/admin_address_model");
const Error = require("../../utils/throwError");
const userSettingGetController = async (req, res, next) => {
    try {
        const user = await User.findById({ _id: req.user._id });
        const userAddress = await AdminAddress.findOne({
            user_id: req.user._id,
        });
        console.log(userAddress);
        return res.status(200).render("pages/setting-page/setting", {
            title: "Setting",
            user,
            userAddress,
        });
    } catch (error) {
        next(error);
    }
};
const userPrivateInfoSettingPostController = async (req, res, next) => {
    try {
        const {
            firstName,
            lastName,
            bio,
            address,
            address2,
            city,
            state,
            zip,
        } = req.body;

        if ((!firstName, !lastName, !bio, !address, !city, !state, !zip)) {
            throw Error("Input fields are required.");
        }
        const user = await new AdminAddress({
            firstName,
            lastName,
            bio,
            address,
            address2,
            city,
            state,
            zip,
            user_id: req.user._id,
        });
        console.log(user);
        await user.save();
        return res.status(201).json(user);
    } catch (error) {
        next(error);
    }
};
const userPrivateInfoSettingUpdateController = async (req, res, next) => {};

module.exports = {
    userSettingGetController,
    userPrivateInfoSettingPostController,
    userPrivateInfoSettingUpdateController,
};
