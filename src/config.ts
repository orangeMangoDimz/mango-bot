import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

interface EnvType {
    key: string;
    value: string;
    action: string | undefined;
    err_msg: string;
}

const requiredEnv: Array<EnvType> = [
    {
        key: 'TOKEN',
        value: '',
        action: process.env.DISCORD_TOKEN,
        err_msg: 'Set up discord token first!',
    },
    {
        key: 'PUBLIC_KEY',
        value: '',
        action: process.env.PUBLIC_KEY,
        err_msg: 'Set up public key first!',
    },
    {
        key: 'CLIENT_ID',
        value: '',
        action: process.env.CLIENT_ID,
        err_msg: 'Set up client id first!',
    },
    {
        key: 'BE_DOMAIN',
        value: '',
        action: process.env.BE_DOMAIN,
        err_msg: 'Set up BE domain first!',
    },
];

const loadEnv = (): Record<string, string> => {
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

