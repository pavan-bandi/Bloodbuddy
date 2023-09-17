const express = require("express");
const connection = require("../config/database");
const { query } = require("../config/database");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const nodemailer = require("nodemailer");
const bodyParser = require('body-parser');

// Add body parser middleware




const router = express.Router();

router.post("/signUp", (req, res) => {
  let user = req.body;
  console.log(req.body);

  let query = "select email from user where email=?";
  connection.query(query, [user.email], (err, results) => {
    if (!err) {
      if (results.length <= 0) {
        let query =
          "insert into user(FirstName,LastName,Email,MobileNumber,City,Pincode) values(?, ?, ?, ?, ?,?)";

        connection.query(
          query,
          [user.name1, user.name2, user.email, user.number, user.city, user.pincode],
          (err, results) => {
            if (!err) {
              return res.status(200).json({
                message: "Successfully registered",
              });
            } else {
              return res.status(500).json({ err });
            }
          }
        );
      } else {
        return res.status(400).json({ message: "Email already exists" });
      }
    } else {
      return res.status(500).json({ err });
    }
  });
});



router.post("/login", (req, res) => {
  let user = req.body;
 console.log(req.body)
  // Assuming userType represents the table name
  let tableName = user.userType;

  // Ensure that tableName is a valid table name without quotes if needed
  if (!tableName) {
    return res.status(400).json({ message: "Invalid usertype" });
  }

  let query = `SELECT password ,email FROM ${tableName} WHERE Email = ?`;
  connection.query(query, [user.email], (err, results) => {
    if (!err) {
      if (results.length > 0) {
        console.log(results)
        console.log(user.password)
        if (results[0].password != user.password) {
          console.log("something bad happened")
          return res.status(500).json({ message: "Password does not match" });
        } else {
          const accessToken = jwt.sign(
            {
              userType:tableName,
             
            
              email:results[0].email
            },
            process.env.SECRET,
            {
              expiresIn: "1h"
            }
          );
          console.log(accessToken)
          
          return res.status(200).json({ accessToken });
        }
      } else {
       
       
        return res.status(500).json({ message: "User does not exist" });
      }
    } else {
      console.log(err)
      return res.status(500).json({ err });
    }
  });
});

router.post("/loginn", (req, res) => {
  let user = req.body;


  // Assuming userType represents the table name
  let tableName = user.userType;

  // Ensure that tableName is a valid table name without quotes if needed
  if (!tableName) {
    return res.status(400).json({ message: "Invalid table name" });
  }

  let query = `SELECT password FROM ${tableName} WHERE username = ?`;
  connection.query(query, [user.name], (err, results) => {
    if (!err) {
      if (results.length > 0) {
        if (results[0].password != user.password) {
          return res.status(500).json({ message: "Password does not match" });
        } else {
          const accessToken = jwt.sign(
            {
              userType:tableName,
              email: results[0].email,
              name:results[0].username
            },
            process.env.SECRET,
            {
              expiresIn: "1h"
            }
          );
          return res.status(200).json({ accessToken });
        }
      } else {
        
        return res.status(500).json({ message: "User does not exist" });
      }
    } else {
    
      return res.status(500).json({ err });
    }
  });
});

module.exports = router;