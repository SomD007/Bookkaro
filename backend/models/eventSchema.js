const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    createdBy: {
        type: String,
        required: true
    }, // this stores the organiser/admin username
    eventName: String,
    totalTickets: Number,
    status: String,
    date: String,
    time: String,
    location: String,
    
},{timestamps: true});

module.exports = mongoose.model("Event", eventSchema);

