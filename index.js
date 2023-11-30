require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT;
const { connection } = require("./config/db");
const { ErrorHandler } = require("./middleware/ErrorHandling.middleware");
const { AppError } = require("./class/AppError");

//All Routes import here
const { authRouter } = require("./routes/auth.route");
const { projectRouter } = require("./routes/project.route");
const { podcastRouter } = require("./routes/podcast.route");

// Global Middleware
app.use(express.json());
app.use(cors());

// All Routes
app.use("/auth", authRouter);
app.use("/project", projectRouter);
app.use("/podcast", podcastRouter)

// if Routes are not exists
app.all("*", (req, res, next) => {
  next(new AppError(`${req.originalUrl} <- this Route not found!`, 404));
});

// Error handling middleware
app.use(ErrorHandler);

// listening server and connection
app.listen(PORT, () => {
  connection();
  console.log({ server: `http://localhost:${PORT}` });
});
