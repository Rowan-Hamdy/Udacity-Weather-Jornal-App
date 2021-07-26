// Setup empty JS object to act as endpoint for all routes
projectData = {};
// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;

/* Spin up the server*/
const server = app.listen(port, ()=>{
//Test that the server is running
	console.log(`running on localhost: http://localhost:${port}`);
});
//Return back all project data by: http://localhost:8000/all
app.get('/all',(req,res)=>{  
	res.send(projectData);
	projectData={};  // to show the new vlaue in each time we write a new value
})

//when app sends data to server

//post function

app.post('/addData',(request, response)=> {

let data = request.body;

console.log('server side data ', data)

//date
//temp -> temperature
// feelings -> user's input

projectData["date"] = data.date;
projectData["temp"] = data.temp;
projectData["content"] = data.content;

response.send(projectData);
});


