const express = require("express");
const bodyParser = require("body-parser");
// create express app instance
const app = express();

// setup the server port
const port = process.env.PORT || 8000;

// parse request data content type application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse request data content type application/json
app.use(bodyParser.json());

// define root route for the server
app.get('/',(req,res) => {
    res.send('Hello World !');
});

// import employee routes
const employeeRoutes = require('./src/routes/employee.route');

// create a url using middlewire
app.use('/api/v1/employee', employeeRoutes);

// listen to port
app.listen(port,() =>{
    console.log(`Express server is running at ${port}`);
});