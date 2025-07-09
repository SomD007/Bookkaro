const mongoose = require("mongoose");

const atnSchema = new mongoose.Schema({
    name: {
        type: String
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }

});
const AtnDetail = mongoose.model("AtnDetail", atnSchema);
module.exports = AtnDetail;