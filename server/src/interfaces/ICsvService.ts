export interface CSVGPSRow {
    latitude: number;
    longitude: number;
    timestamp: string;
    ignition: string;
}

export interface ICsvService {
    parseCSV(buffer: Buffer): Promise<CSVGPSRow[]>;
}
