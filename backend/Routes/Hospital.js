const express = require("express");
const connection = require("../config/database");
const { query } = require("../config/database");
const jwt = require("jsonwebtoken");

const nodemailer = require("nodemailer");
const bodyParser = require('body-parser');
const router = express.Router();

const { authenticateandAuth } = require("../auth/auth");

router.get('/jan',(req,res)=>{
 

    
  const sql = `
    SELECT BloodGroup.Bid, BloodGroup.GroupName, BloodRecords.Quantity
    FROM BloodRecords
    JOIN BloodGroup ON BloodRecords.Bid = BloodGroup.Bid
    WHERE BloodRecords.Hid = ?
  `;

  connection.query(sql, [req.locals.id], (err, results) => {
    if (err) {
      
      console.error('Error executing the query:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    return res.json(results);
  });
  
})



router.get('/avail',authenticateandAuth('hospital'), (req, res) => {
   
   
    
    const sql = `
      SELECT BloodGroup.Bid, BloodGroup.GroupName, BloodRecords.Quantity
      FROM BloodRecords
      JOIN BloodGroup ON BloodRecords.Bid = BloodGroup.Bid
      WHERE BloodRecords.Hid = 1
    `;
  
    connection.query(sql, (err, results) => {
      if (err) {
        
        console.error('Error executing the query:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
 
      return res.json(results);
    });
  });


  // ...

// PUT request handler for updating blood quantities
router.put('/update-blood-quantity', (req, res) => {
  const requestData = req.body;
  const email = requestData.email;

  const updateQuery = `
    UPDATE BloodRecords
    SET Quantity = ?
    WHERE Hid = (SELECT Hid FROM hospital WHERE email = ?) AND Bid = ?;
  `;

  const promises = Object.values(requestData)
    .filter(record => typeof record === 'object' && record.Bid && record.Quantity)
    .map(record => {
      return new Promise((resolve, reject) => {
        connection.query(updateQuery, [record.Quantity, email, record.Bid], (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    });

  Promise.all(promises)
    .then(() => {
      res.status(200).json({ message: 'Blood quantities updated successfully' });
    })
    .catch(err => {
      console.error('Error updating blood quantities:', err);
      res.status(500).json({ error: 'Error updating blood quantities' });
    });
});




  module.exports=router;
  
  