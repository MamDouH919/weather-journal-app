// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));
const port = 3001;

// TODO-Spin up the server
app.post('/api', (req, res) => {
    let { date, cityName, temp, content } = req.body;
    projectData = { date, cityName, temp, content };
    res.send(projectData);
  });
  // Initialize all route with a callback function
app.get('/all', sendData)

// Callback function to complete GET '/all'
function sendData (req, res) {
 // res.send('Green')
 res.send(projectData)
}
  // Setup Server
  const server = app.listen(port, listening);
function listening(){
    console.log(`running on localhost: ${port}`);
};

