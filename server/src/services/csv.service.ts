import csv from 'csv-parser';
import { Readable } from 'stream';

export interface CSVGPSRow {
  latitude: number;
  longitude: number;
  timestamp: string;
  ignition: string;
}

class CSVValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CSVValidationError';
  }
}

const validateLatitude = (lat: number, rowIndex: number): void => {
  if (isNaN(lat) || lat < -90 || lat > 90) {
    throw new CSVValidationError(
      `Invalid latitude at row ${rowIndex + 1}: ${lat}. Must be between -90 and 90.`
    );
  }
};

const validateLongitude = (lon: number, rowIndex: number): void => {
  if (isNaN(lon) || lon < -180 || lon > 180) {
    throw new CSVValidationError(
      `Invalid longitude at row ${rowIndex + 1}: ${lon}. Must be between -180 and 180.`
    );
  }
};

const validateTimestamp = (timestamp: string, rowIndex: number): void => {
  if (!timestamp || timestamp.trim() === '') {
    throw new CSVValidationError(
      `Missing timestamp at row ${rowIndex + 1}.`
    );
  }

  const date = new Date(timestamp);
  if (isNaN(date.getTime())) {
    throw new CSVValidationError(
      `Invalid timestamp at row ${rowIndex + 1}: ${timestamp}. Must be a valid date format.`
    );
  }
};

const validateIgnition = (ignition: string, rowIndex: number): void => {
  const validValues = ['ON', 'OFF', 'on', 'off'];
  if (!validValues.includes(ignition)) {
    throw new CSVValidationError(
      `Invalid ignition value at row ${rowIndex + 1}: ${ignition}. Must be 'ON' or 'OFF'.`
    );
  }
};

const validateRequiredColumns = (data: any, rowIndex: number): void => {
  const requiredColumns = ['latitude', 'longitude', 'timestamp', 'ignition'];
  const missingColumns = requiredColumns.filter(col => !(col in data));

  if (missingColumns.length > 0) {
    throw new CSVValidationError(
      `Missing required columns at row ${rowIndex + 1}: ${missingColumns.join(', ')}`
    );
  }
};

export const parseCSV = async (
  buffer: Buffer
): Promise<CSVGPSRow[]> => {
  return new Promise((resolve, reject) => {
    const results: CSVGPSRow[] = [];
    let rowIndex = 0;

    const stream = Readable.from(buffer.toString());

    stream
      .pipe(csv())
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
        } catch (error) {
          // Stop parsing and reject with validation error
          stream.destroy();
          reject(error);
        }
      })
      .on('end', () => {
        if (results.length === 0) {
          reject(new CSVValidationError('CSV file is empty or contains no valid data rows.'));
        } else {
          resolve(results);
        }
      })
      .on('error', (error) => {
        reject(new Error(`CSV parsing error: ${error.message}`));
      });
  });
};
