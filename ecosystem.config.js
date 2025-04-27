const path = require("path");
const dotenv = require("dotenv");

// Configure the env mode
const env_mode = process.env.NODE_ENV;
let app_name = ""
if (!env_mode) throw new Error("Put the env config first!")
let env_name = "";
if (env_mode.toLowerCase() === "development") {
    app_name = "discord-dev"
    env_name = ".env.development";
} else if (env_mode.toLowerCase() === "production") {
    app_name = "discord-production"
    env_name = ".env.production";
} else {
    throw new Error("Invalid env mode");
}

dotenv.config({ path: path.resolve(__dirname, env_name) });

module.exports = {
    apps: [
        {
            name: app_name,
            script: "dist/src/index.js",
            watch: true,
            ignore_watch: ["node_modules", "logs"],
            watch_options: {
                followSymlinks: false,
                usePolling: true,
            },
            env: {
                NODE_ENV: env_mode,
            },
        },
    ],
};
