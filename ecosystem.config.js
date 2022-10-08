module.exports = {
    apps: [
        {
            name: "cervical-range-api",
            script: "./dist/server.js",
            instances: 2,
            watch: ["dist"],
            watch_delay: 5000,
            ignore_watch: ["node_modules", "docs"],
        },
    ],
}
