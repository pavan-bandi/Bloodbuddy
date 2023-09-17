const express = require("express");
const connection = require("../config/database");
const { query } = require("../config/database");
const jwt = require("jsonwebtoken");

const nodemailer = require("nodemailer");
const bodyParser = require('body-parser');
const router = express.Router();

const { authenticateandAuth } = require("../auth/auth");

router.post('/donate', (req, res) => {
    const { name, bloodGroup, contactNumber, city, message } = req.body;
    console.log(req.body)
  
    if (!name || !bloodGroup || !contactNumber || !city) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
  

    const query = 'INSERT INTO donor (name, bloodgroup, mobileNumber, city, message) VALUES (?, ?, ?, ?, ?)';
    connection.query(query, [name, bloodGroup, contactNumber, city, message], (err, results) => {
      if (err) {
        console.error('Error inserting data:', err);
        return res.status(500).json({ error: 'Error saving donor data' });
      }
  
      return res.status(201).json({ message: 'Donor data saved successfully' });
    });
  });

  router.get('/donors', (req, res) => {
    const query = 'SELECT * FROM donor';
  
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Failed to fetch donor details:', err);
        res.status(500).json({ error: 'Failed to fetch donor details' });
      } else {
        res.json(results);
      }
    });
  });

  module.exports=router;