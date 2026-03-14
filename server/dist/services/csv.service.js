"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CsvService = void 0;
const csv_parser_1 = __importDefault(require("csv-parser"));
const stream_1 = require("stream");
const tsyringe_1 = require("tsyringe");
class CSVValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'CSVValidationError';
    }
}
let CsvService = class CsvService {
    validateLatitude(lat, rowIndex) {
        if (isNaN(lat) || lat < -90 || lat > 90) {
            throw new CSVValidationError(`Invalid latitude at row ${rowIndex + 1}: ${lat}. Must be between -90 and 90.`);
        }
    }
    validateLongitude(lon, rowIndex) {
        if (isNaN(lon) || lon < -180 || lon > 180) {
            throw new CSVValidationError(`Invalid longitude at row ${rowIndex + 1}: ${lon}. Must be between -180 and 180.`);
        }
    }
    validateTimestamp(timestamp, rowIndex) {
        if (!timestamp || timestamp.trim() === '') {
            throw new CSVValidationError(`Missing timestamp at row ${rowIndex + 1}.`);
        }
        const date = new Date(timestamp);
        if (isNaN(date.getTime())) {
            throw new CSVValidationError(`Invalid timestamp at row ${rowIndex + 1}: ${timestamp}. Must be a valid date format.`);
        }
    }
    validateIgnition(ignition, rowIndex) {
        const validValues = ['ON', 'OFF', 'on', 'off'];
        if (!validValues.includes(ignition)) {
            throw new CSVValidationError(`Invalid ignition value at row ${rowIndex + 1}: ${ignition}. Must be 'ON' or 'OFF'.`);
        }
    }
    validateRequiredColumns(data, rowIndex) {
        const requiredColumns = ['latitude', 'longitude', 'timestamp', 'ignition'];
        const missingColumns = requiredColumns.filter(col => !(col in data));
        if (missingColumns.length > 0) {
            throw new CSVValidationError(`Missing required columns at row ${rowIndex + 1}: ${missingColumns.join(', ')}`);
        }
    }
    async parseCSV(buffer) {
        return new Promise((resolve, reject) => {
            const results = [];
            let rowIndex = 0;
            const stream = stream_1.Readable.from(buffer.toString());
            stream
                .pipe((0, csv_parser_1.default)())
                .on('data', (data) => {
                try {
                    this.validateRequiredColumns(data, rowIndex);
                    const latitude = Number(data.latitude);
                    const longitude = Number(data.longitude);
                    const timestamp = data.timestamp;
                    const ignition = data.ignition;
                    this.validateLatitude(latitude, rowIndex);
                    this.validateLongitude(longitude, rowIndex);
                    this.validateTimestamp(timestamp, rowIndex);
                    this.validateIgnition(ignition, rowIndex);
                    results.push({
                        latitude,
                        longitude,
                        timestamp,
                        ignition: ignition.toUpperCase()
                    });
                    rowIndex++;
                }
                catch (error) {
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
    }
};
exports.CsvService = CsvService;
exports.CsvService = CsvService = __decorate([
    (0, tsyringe_1.injectable)()
], CsvService);
