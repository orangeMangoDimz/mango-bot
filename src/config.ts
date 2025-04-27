import dotenv from "dotenv";
import path from "path";
import { ENV_ERROR_MSG } from "./utils/constant";

interface EnvType {
    key: string;
    value: string;
    action: string | undefined;
    err_msg: string;
}

const requiredEnv: Array<EnvType> = [
    {
        key: "TOKEN",
        value: "",
        action: process.env.DISCORD_TOKEN,
        err_msg: ENV_ERROR_MSG.TOKEN,
    },
    {
        key: "PUBLIC_KEY",
        value: "",
        action: process.env.PUBLIC_KEY,
        err_msg: ENV_ERROR_MSG.PUBLIC_KEY,
    },
    {
        key: "CLIENT_ID",
        value: "",
        action: process.env.CLIENT_ID,
        err_msg: ENV_ERROR_MSG.CLIENT_ID,
    },
    {
        key: "BE_DOMAIN",
        value: "",
        action: process.env.BE_DOMAIN,
        err_msg: ENV_ERROR_MSG.BE_DOMAIN,
    },
];

const loadEnv = (): Record<string, string> => {
    const env_mode: string | undefined = process.env.NODE_ENV;
    if (!env_mode) throw new Error(ENV_ERROR_MSG.NOT_CONFIGURED);

    let env_name: string = "";

    if (env_mode.toLowerCase() === "development") {
        env_name = ".env.development";
    } else if (env_mode.toLowerCase() === "porfuction") {
        env_name = ".env.production";
    } else {
        throw new Error(ENV_ERROR_MSG.UNKNOWN_MODE_ENV);
    }

    dotenv.config({ path: path.resolve(__dirname, env_name) });

    const envConfig: Record<string, string> = {};

    for (const env of requiredEnv) {
        const value: string | undefined = env.action;
        if (value === undefined) {
            throw new Error(env.err_msg);
        }
        env.value = value;
        envConfig[env.key] = value;
    }

    return envConfig;
};

export const config = loadEnv();
