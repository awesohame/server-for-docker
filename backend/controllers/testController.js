const { cloneRepo } = require("../services/githubService");
const { buildAndRunContainer, runLoadTests } = require("../services/dockerService");

exports.runTests = async (req, res) => {
    const { repoUrl } = req.body;
    if (!repoUrl) return res.status(400).json({ error: "Repo URL required" });

    try {
        const repoPath = await cloneRepo(repoUrl);
        await buildAndRunContainer(repoPath);
        const results = await runLoadTests(repoPath);

        res.json({ success: true, results });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
