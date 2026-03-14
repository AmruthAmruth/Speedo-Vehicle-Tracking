import { container } from 'tsyringe';
import { UserRepository } from '../repositories/user.repository';
import { TripRepository } from '../repositories/trip.repository';
import { GPSPointRepository } from '../repositories/gpspoint.repository';
import { AuthService } from '../services/auth.service';
import { TripUploadService } from '../services/tripUpload.service';
import { CsvService } from '../services/csv.service';

 
container.register('IUserRepository', { useClass: UserRepository });
container.register('ITripRepository', { useClass: TripRepository });
container.register('IGPSPointRepository', { useClass: GPSPointRepository });

 
container.register('IAuthService', { useClass: AuthService });
container.register('ITripUploadService', { useClass: TripUploadService });
container.register('ICsvService', { useClass: CsvService });

export { container };
