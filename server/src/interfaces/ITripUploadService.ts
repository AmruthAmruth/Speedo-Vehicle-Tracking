export interface ITripUploadService {
    uploadTrip(userId: string, fileBuffer: Buffer): Promise<any>;
}
