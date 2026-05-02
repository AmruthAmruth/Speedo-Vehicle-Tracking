"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const gps_controller_1 = require("../controllers/gps.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const tsyringe_1 = require("tsyringe");
const gpsRouter = (0, express_1.Router)();
const gpsController = tsyringe_1.container.resolve(gps_controller_1.GPSController);
// POST /api/gps/:tripId/ingest
gpsRouter.post('/:tripId/ingest', auth_middleware_1.authMiddleware, gpsController.ingestPoint);
exports.default = gpsRouter;
