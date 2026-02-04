"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GPSPointModel = void 0;
const mongoose_1 = require("mongoose");
const GPSPointSchema = new mongoose_1.Schema({
    tripId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Trip',
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    timestamp: {
        type: Date,
        required: true
    },
    ignition: {
        type: Boolean,
        required: true
    },
    speed: {
        type: Number,
        default: 0
    }
}, {
    timestamps: false
});
exports.GPSPointModel = (0, mongoose_1.model)('GPSPoint', GPSPointSchema);
