import multer from 'multer';

const storage = multer.memoryStorage();

const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {

  if (file.mimetype === 'text/csv' ||
    file.mimetype === 'application/csv' ||
    file.originalname.endsWith('.csv')) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only CSV files are allowed.'));
  }
};

export const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter
});