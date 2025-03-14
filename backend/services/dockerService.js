const { exec } = require("child_process");
const path = require("path");

exports.buildAndRunContainer = (repoPath) => {
    return new Promise((resolve, reject) => {
        const serverPath = path.join(repoPath, "server");

        exec(`cd ${serverPath} && docker build -t my-api . && docker run -d -p 8000:3000 --name my-api-container my-api`, (err) => {
            if (err) return reject(new Error("Failed to start Docker container"));
            resolve();
        });
    });
};

exports.runLoadTests = (repoPath) => {
    return new Promise((resolve, reject) => {
        const testDir = path.join(repoPath, "server", "load-test"); // Assuming test files are in 'server/load-test'

        // Run K6 inside the API container
        exec(`docker exec my-api-container k6 run /app/load-test/test-script.js`, (err, stdout, stderr) => {
            if (err) return reject(new Error(`Load test failed: ${stderr}`));
            resolve(stdout);
        });
    });
};
