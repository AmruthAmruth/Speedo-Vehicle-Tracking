"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCSV = void 0;
const csv_parser_1 = __importDefault(require("csv-parser"));
const stream_1 = require("stream");
class CSVValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'CSVValidationError';
    }
}
const validateLatitude = (lat, rowIndex) => {
    if (isNaN(lat) || lat < -90 || lat > 90) {
        throw new CSVValidationError(`Invalid latitude at row ${rowIndex + 1}: ${lat}. Must be between -90 and 90.`);
    }
};
const validateLongitude = (lon, rowIndex) => {
    if (isNaN(lon) || lon < -180 || lon > 180) {
        throw new CSVValidationError(`Invalid longitude at row ${rowIndex + 1}: ${lon}. Must be between -180 and 180.`);
    }
};
const validateTimestamp = (timestamp, rowIndex) => {
    if (!timestamp || timestamp.trim() === '') {
        throw new CSVValidationError(`Missing timestamp at row ${rowIndex + 1}.`);
    }
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) {
        throw new CSVValidationError(`Invalid timestamp at row ${rowIndex + 1}: ${timestamp}. Must be a valid date format.`);
    }
};
const validateIgnition = (ignition, rowIndex) => {
    const validValues = ['ON', 'OFF', 'on', 'off'];
    if (!validValues.includes(ignition)) {
        throw new CSVValidationError(`Invalid ignition value at row ${rowIndex + 1}: ${ignition}. Must be 'ON' or 'OFF'.`);
    }
};
const validateRequiredColumns = (data, rowIndex) => {
    const requiredColumns = ['latitude', 'longitude', 'timestamp', 'ignition'];
    const missingColumns = requiredColumns.filter(col => !(col in data));
    if (missingColumns.length > 0) {
        throw new CSVValidationError(`Missing required columns at row ${rowIndex + 1}: ${missingColumns.join(', ')}`);
    }
};
const parseCSV = async (buffer) => {
    return new Promise((resolve, reject) => {
        const results = [];
        let rowIndex = 0;
        const stream = stream_1.Readable.from(buffer.toString());
        stream
            .pipe((0, csv_parser_1.default)())
            .on('data', (data) => {
            try {
                // Validate required columns exist
                validateRequiredColumns(data, rowIndex);
                // Parse and validate data
                const latitude = Number(data.latitude);
                const longitude = Number(data.longitude);
                const timestamp = data.timestamp;
                const ignition = data.ignition;
                validateLatitude(latitude, rowIndex);
                validateLongitude(longitude, rowIndex);
                validateTimestamp(timestamp, rowIndex);
                validateIgnition(ignition, rowIndex);
                results.push({
                    latitude,
                    longitude,
                    timestamp,
                    ignition: ignition.toUpperCase()
                });
                rowIndex++;
            }
            catch (error) {
                // Stop parsing and reject with validation error
                stream.destroy();
                reject(error);
            }
        })
            .on('end', () => {
            if (results.length === 0) {
                reject(new CSVValidationError('CSV file is empty or contains no valid data rows.'));
            }
            else {
                resolve(results);
            }
        })
            .on('error', (error) => {
            reject(new Error(`CSV parsing error: ${error.message}`));
        });
    });
};
exports.parseCSV = parseCSV;
