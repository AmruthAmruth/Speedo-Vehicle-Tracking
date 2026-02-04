"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const trip_routes_1 = __importDefault(require("./routes/trip.routes"));
const errorHandler_middleware_1 = require("./middleware/errorHandler.middleware");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api', auth_routes_1.default);
app.use('/trip', trip_routes_1.default);
app.get('/', (req, res) => {
    res.send('API is running...');
});
// 404 Handler - Must be after all routes
app.use(errorHandler_middleware_1.notFoundHandler);
// Global Error Handler - Must be last
app.use(errorHandler_middleware_1.errorHandler);
exports.default = app;
