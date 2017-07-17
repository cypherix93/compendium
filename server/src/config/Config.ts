import path = require("path");
import dotenv = require("dotenv");
import {IAppConfig} from "../interfaces/IAppConfig";

const rootPath = path.join(__dirname, "..");

const env = process.env.NODE_ENV || "development";
const isDevEnv = (env === "development");

// If we are in development mode, set up dotenv
// NOTE: Environment variables will be autoloaded from the environment when this is deployed to e.g. testing, staging, production etc.
if (isDevEnv)
    dotenv.config();

export const CONFIG: IAppConfig = {
    rootPath: rootPath,
    port: process.env.PORT,
    cors: {
        origin: process.env.CLIENT_URL || true,
        credentials: true
    },
    winston: {
        level: isDevEnv ? "debug" : "info"
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        expiryInMinutes: 30,
        cookie: {
            name: process.env.JWT_COOKIE,
            options: {
                httpOnly: true,
                secure: !isDevEnv,
                expires: new Date(2099, 1, 1)
            }
        }
    },
    db: {
        url: process.env.DATABASE_URL
    },
    settings: {
        storagePath: path.resolve(process.env.STORAGE_PATH)
    }
};