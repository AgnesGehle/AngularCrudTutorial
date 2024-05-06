const express = require('express')
const bodyParser = require('body-parser')
const mysql= require('mysql');
const md5 = require('md5');
const server = express()
server.use(bodyParser.json());

// Add Access Control Allow Origin headers
server.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  next();
});


//database connection
const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  port     :  3306,
  password : 'mysql_angular_crud',
  database : 'angular_crud'
});

db.connect(function (error) {
  if(error) {
    console.log('Error connecting to DB ' + error);
  } else {
    console.log('Woohoo, you successfully connected to DB');
  }
});

//port where server is running
server.listen(4201, function check(error) {
  if(error) {
    console.log("Server error occurred! " + error);
  } else {
    console.log("Server started port 4201!");
  }
});

//TABLE employee_details
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

  const sql = 'INSERT INTO angular_crud.employee_details SET ?';

  db.query(sql, details, (error) => {
    if(error) {
      res.send({status:false, message: "Employee creation failed"});
    } else {
      res.send({status: true, message: "Employee successfully created!"})
    }
  });
});

//view all employee records
server.get("/api/employees", (req, res) =>{
  const sql = 'SELECT * FROM angular_crud.employee_details';
  db.query(sql, function(error, result) {
    if(error) {
      console.log("Error fetching Data from DB");
    } else {
      res.send({status: true, data: result});
    }
  });
});

//search for employee record
server.get("/api/employee/:id", (req, res) => {
  const employeeId = req.params.id;
  const sql = 'SELECT * FROM angular_crud.employee_details WHERE id=' + employeeId;
  db.query(sql, function(error, result){
    if(error) {
      console.log(error);
    } else {
      res.send({status: 200, data: result});
    }
  });
});

//update record
server.put("/api/employee/update/:id", (req, res) =>{
  const sql = 'UPDATE angular_crud.employee_details SET firstname=?,lastname=?,email=?,jobTitle=?,department=?,location=? WHERE id=?';
  const data = [req.body.firstname,req.body.lastname,req.body.email,req.body.jobTitle,req.body.department,req.body.location,req.params.id]

  db.query(sql, data, (error, result)=> {
    if(error) {
      res.send({status:500, message: "Employee updating failed"});
    } else {
      res.send({status: 200, message: result})
    }
  });
});

//delete record
server.delete("/api/employee/delete/:id", (req, res) =>{
  const sql = 'DELETE FROM angular_crud.employee_details WHERE id=' + req.params.id + '';

  db.query(sql, (error) => {
    if(error) {
      res.send({status: 500, message: "Deletion failed!"});
    } else {
      res.send({status: 200, message: "Deletion successful!"});
    }
  });
});

//TABLE users
//register new user
server.post("/api/user/add", (req, res) => {
  const md5Password = md5(req.body.password);
  const details = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: md5Password,
  }

  const sql = 'INSERT INTO angular_crud.users SET ?';

  db.query(sql, details, (error) => {
    if(error) {
      res.send({status:500, message: error});
    } else {
      res.send({status: 200, message: "Employee successfully created!"})
    }
  });
});

//get all users
server.get("/api/users", (req, res) =>{
  const sql = 'SELECT * FROM angular_crud.users';
  db.query(sql, function(error, result) {
    if(error) {
      console.log(error);
    } else {
      res.send({status: 200, data: result});
    }
  });
});

//user login
server.post("/api/login", (req, res) => {
  //  // if nothing matches return generic error so that hackers do not know what doesnt match
  //  if everything is alright then return an access_token to the user holding the current day + 4 hours in milliseconds.
  //  when fe receives the date in ms it should save it in the local storage and use it with each new request.
  //

  const email = req.body.email;
  const password = md5(req.body.password);

  const sql = `SELECT * FROM angular_crud.users WHERE email="${email}" AND password="${password}"`;
  db.query(sql, (error, result) => {

    if(error) {
      res.send({access: false, status: 500, message: error})
    } else if(result.length === 0) {
      res.send({access: false, status: 401, message:'user not authorized'})
    } else {
      res.send({access: true, status: 200, message:'user found, ready for login'})
    }
  });
});

