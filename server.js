const express = require("express");
const server = express();

// Set the port to listen on
const PORT = process.env.PORT || 3000;

// Set up middleware to parse request bodies
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// Require routes for handling API requests and rendering views
require("./routes/api")(server);
require("./routes/view")(server);

// Serve static files from the 'public' directory
server.use(express.static(__dirname + '/public'));

// Start the server and log a message to the console
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
