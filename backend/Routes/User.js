const express = require("express");
const connection = require("../config/database");
const { authenticateandAuth } = require("../auth/auth");

const jwt = require("jsonwebtoken");

const nodemailer = require("nodemailer");
const bodyParser = require('body-parser');


// Add body parser middleware




const router = express.Router();

router.post("/signup", (req, res) => {

  let user = req.body;


  let query = "select email from user where email=?";
  connection.query(query, [user.email], (err, results) => {
    if (!err) {
      if (results.length <= 0) {
        let query =
          "insert into user(FirstName,LastName,Email,MobileNumber,City,Pincode) values(?, ?, ?, ?, ?,?)";

        connection.query(
          query,
          [user.name, user.name, user.email, user.mobile, user.city, user.pincode],
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
  const userType=req.body.userType
  let query = "select pincode,MobileNumber from ? where pincode=?";
  connection.query(query,[userType] [user.pincode], (err, results) => {
    if (!err) {
      if (results.length > 0) {
        if (results[0].MobileNumber != user.number) {
          return res.status(500).json({ message: "password does not match" });

        }
        else {
          response = {
            email: results[0].email,
            number: results[0].MobileNumber
          }
          const accessToken = jwt.sign(response, "process.env", {
            expiresIn: "1h",
          })
          return res.status(200).json({
            accessToken
          })

        }


      }
      else {
        return res.status(500).json({ message: 'user does not exist' })
      }
    }
    else {
      return res.status(500).json({ err })
    }
  }
  )
})
router.get('/avail',authenticateandAuth('user'),(req,res)=>{
 
  const sql = `
  SELECT H.HName, B.GroupName, BR.Quantity,h.city
FROM Hospital H
JOIN BloodRecords BR ON H.Hid = BR.Hid
JOIN BloodGroup B ON B.Bid = BR.Bid

`;
connection.query(sql,(err,results)=>{
  if (err){
    console.error('Error executing the query:', err);
        return res.status(500).json({ error: 'Internal Server Error Error executing the query:' });


  }
  else{
    return res.json(results)
  }

})

})
module.exports = router;

router.get('/getdetails',(req,res)=>{
  user=req.body
  console.log(user)
  sql="SELECT *FROM User WHERE Email = ?"
  connection.query(sql,[user.name],(err,results)=>{
    if (!err){
      console.log(results)
      return res.json(results)
    }
    else{
      console.error('Error executing the query:', err);
        return res.status(500).json({ error: 'Internal Server Error Error executing the query:' });
    }
  })
})