require("dotenv").config();
const express = require("express");
const cors = require("cors");
const testRoutes = require("./routes/testRoutes");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/tests", testRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
