require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
// const redisClient = require("./redisClient"); // Import the Redis client
const userRouter = require("./Routes/userRouter");
const notesRouter = require("./Routes/noteRouter");
const projectRouter = require("./Routes/projectRouter");
const { checkForToken } = require("./Middlewares/authHelper");
const { leakyBucket } = require("./Middlewares/rateLimiter");

const app = express();

// Enable CORS for all routes
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// Apply middlewares
app.use(checkForToken());
app.use(leakyBucket);

// Define route handlers
app.get("/", (req, res) => {
  res.status(200).send("This is the backend of noteHarbour");
});

app.use("/", userRouter);
app.use("/notes", notesRouter);
app.use("/project", projectRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Something went wrong" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

module.exports = app;
