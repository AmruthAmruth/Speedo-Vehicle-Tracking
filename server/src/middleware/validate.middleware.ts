import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';
import { HTTP_STATUS } from '../shared/constants/http.constants';

export const validate = (schema: z.ZodSchema) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params,
            });
            return next();
        } catch (error) {
            if (error instanceof ZodError) {
                // Define expected shape
                interface ZodErrorLike {
                    errors: Array<{
                        path: (string | number)[];
                        message: string;
                    }>;
                }

                // Cast through unknown to avoid 'any'
                const zodError = error as unknown as ZodErrorLike;

                return res.status(HTTP_STATUS.BAD_REQUEST).json({
                    message: 'Validation failed',
                    errors: zodError.errors.map((e: { path: (string | number)[]; message: string }) => ({
                        field: e.path.join('.'),
                        message: e.message,
                    })),
                });
            }
            return next(error);
        }
    };
