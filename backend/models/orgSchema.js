const mongoose = require("mongoose");

const orgSchema = new mongoose.Schema({
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
const OrgDetail = mongoose.model("OrgDetail", orgSchema);
module.exports = OrgDetail;




// // organiserSchema.js
// {
//   name: String,
//   username: String,
//   password: String,
//   eventsCreated: [ObjectId], // organiser-specific
// }

// // adminSchema.js
// {
//   fullName: String,
//   username: String,
//   password: String,
//   accessLevel: String, // admin-specific
// }

// // attendeeSchema.js
// {
//   name: String,
//   email: String,
//   password: String,
//   tickets: [ObjectId] // attendee-specific
// }
