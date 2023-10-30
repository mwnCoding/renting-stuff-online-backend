const mongoose = require("mongoose");

const { Schema, model } = require("mongoose");

const requestSchema = new Schema({
    requesterId: {
        required: [true, "Requester Id is required"],
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    ownerId: {
        required: [true, "Requester Id is required"],
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    requestMessage :{
        type: String,
        required: [true, "Request Message is required"],
        minLength: 20
    },
    responseMessage :{
        type: String,
        minLength: 20
    },
    dateRange: {
        type: Date, 
        default: Date.now
    },
    status:{
        type: String,
        enum: ["pending", "accepted", "declined"],
        default: "pending"
    }
});

const Request = model("Request", requestSchema);

module.exports = Request;
