// Import required npm modules
const express = require("express"); //for receiving/responding to HTTP requests
const logger = require("morgan"); //for logging request/response info
const mongoose = require("mongoose"); //for interacting with MongoDB
const path = require("path"); //for working with file and directory paths

// Define default port according to PORT variable found in env file, or else default to port 3000 if env file is not found
const PORT = process.env.PORT || 3001;

// Import routes/controllers from controllers directory
const routes = require("./controllers");

// Import db models from models directory
const db = require("./models");

// Initialize express app
const app = express();

// Configure logger for development environment
app.use(logger("dev"));

// Initialize/configure express middleware
app.use(express.urlencoded({ extended: true })); //parse incoming requests with urlencoded payloads
app.use(express.json()); //parse incoming requests with json payloads
app.use(express.static(path.join(__dirname, "public"))); //serve static assets from public folder

// Configure connection to MongoDB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });

// Configure express to use routes defined in controllers directory
app.use(routes);

// Start server and listen for requests on specified PORT
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});