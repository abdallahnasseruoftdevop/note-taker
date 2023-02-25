// Import the built-in Node.js module 'path'
const path = require("path")

// Export a function that takes in an 'app' object
module.exports = function (app) {
// When a GET request is made to '/notes', send the 'notes.html' file
app.get("/notes", (req, res) => {
res.sendFile(path.join(__dirname,"../public/notes.html")) // The '..' goes up one directory from the current file
})


}