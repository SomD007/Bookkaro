const mongoose = require("mongoose");

const admSchema = new mongoose.Schema({
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
const AdmDetail = mongoose.model("AdmDetail", admSchema);
module.exports = AdmDetail;