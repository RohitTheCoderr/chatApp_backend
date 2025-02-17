import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    name: { type: String, required: true },
    password: { type: String, required: true, select: false },
    mobileNo: { type: String },
    email: { type: String },
    avatar: { type: String, default: "" }, // Profile picture URL
});

const UserProfileModel = model("user", userSchema, "users");

export default UserProfileModel;
