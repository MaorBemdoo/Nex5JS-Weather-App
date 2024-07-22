const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {type: String, unique: true, required: true},
    full_name: {type: String, required: true},
    password: {type: String, required: true, unique: true},
    favorites: [{
        type: String,
    }]
}, {timestamps: true})

const User = mongoose.model("User", userSchema);

export default User