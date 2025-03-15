require("dotenv").config();
const express = require("express");
const cors = require("cors");
const testRoutes = require("./routes/testRoutes");
const extractApiRoutes = require("./routes/extractApiRoutes");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/tests", testRoutes);
app.use("/api/extract-api", extractApiRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
