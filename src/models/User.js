import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {type: String, unique: true, required: true},
    full_name: {type: String, required: true},
    password: {type: String, required: true},
    favorites: {type: Array, default: []}
}, {timestamps: true})

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User