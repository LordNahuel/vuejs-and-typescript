"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
if (process.env.NODE_ENV === 'production') {
    require('custom-env').env('production');
}
if (process.env.NODE_ENV === 'development') {
    require('custom-env').env('development');
}
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const passport_1 = __importDefault(require("passport"));
const passport_2 = __importDefault(require("./middlewares/passport"));
// initialization 
const app = express_1.default();
// routes imports 
const index_routes_1 = __importDefault(require("./routes/index.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
// settings
app.set('port', process.env.PORT);
// middlewares 
app.use(morgan_1.default('dev'));
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
passport_1.default.use(passport_2.default);
// routes 
app.use(index_routes_1.default);
app.use('/users', user_routes_1.default);
app.use('/auth', auth_routes_1.default);
exports.default = app;
