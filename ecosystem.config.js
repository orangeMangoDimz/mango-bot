const path = require("path")
const dotenv = require("dotenv")
dotenv.config({ path: path.resolve(__dirname, '.env') });

module.exports = {
  apps: [{
    name: "discord-bot",
    script: "./dist/index.js",
  }]
}
