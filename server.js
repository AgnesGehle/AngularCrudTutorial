const express = require('express')
const bodyParser = require('body-parser')
const mysql= require('mysql');
const server = express()
server.use(bodyParser.json());

// Add Access Control Allow Origin headers
server.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  next();
});


//database connection
const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'db_employees'
});

db.connect(function (error) {
  if(error) {
    console.log('Error connecting to DB');
  } else {
    console.log('Woohoo, you successfully connected to DB');
  }
});

//port where server is running
server.listen(4201, function check(error) {
  if(error) {
    console.log("Server error occurred!");
  } else {
    console.log("Server started port 4201!");
  }
});

//create record
server.post("/api/employee/add", (req, res) => {
  const details = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    jobTitle: req.body.jobTitle,
    department: req.body.department,
    location: req.body.location
  }

  const sql = 'INSERT INTO employee_details SET ?';

  db.query(sql, details, (error) => {
    if(error) {
      res.send({status:false, message: "Employee creation failed"});
    } else {
      res.send({status: true, message: "Employee successfully created!"})
    }
  });
});

//view record
server.get("/api/employee", (req, res) =>{
  const sql = 'SELECT * FROM employee_details';
  db.query(sql, function(error, result) {
    if(error) {
      console.log("Error fetching Data from DB");
    } else {
      res.send({status: true, data: result});
    }
  });
});

//search for record
server.get("/api/employee/:id", (req, res) => {
  const employeeId = req.params.id;
  const sql = 'SELECT * FROM employee_details WHERE id=' + employeeId;
  db.query(sql, function(error, result){
    if(error) {
      console.log("Error finding requested id");
    } else {
      res.send({status: true, data: result});
    }
  });
});

//update record
server.put("/api/employee/update/:id", (req, res) =>{
  const sql = 'UPDATE employee_details SET firstname=?,lastname=?,email=?,jobTitle=?,department=?,location=? WHERE id=?';
  const data = [req.body.firstname,req.body.lastname,req.body.email,req.body.jobTitle,req.body.department,req.body.location,req.params.id]

  db.query(sql, data, (error, result)=> {
    if(error) {
      res.send({status:false, message: "Employee updating failed"});
    } else {
      res.send({status: true, message: result})
    }
  });
});


//delete record
server.delete("/api/employee/delete/:id", (req, res) =>{
  const sql = 'DELETE FROM employee_details WHERE id=' + req.params.id + '';

  db.query(sql, (error) => {
    if(error) {
      res.send({status: false, message: "Deletion failed!"});
    } else {
      res.send({status: true, message: "Deletion successful!"});
    }
  });
});


