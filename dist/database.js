"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dboptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
};
mongoose_1.default.connect(process.env.MONGO_URI, dboptions);
const connection = mongoose_1.default.connection;
connection.once('open', () => {
    console.log("Mongodb connection established");
});
connection.on('error', error => {
    console.log(error);
    process.exit(0);
});
