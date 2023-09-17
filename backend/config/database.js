require('dotenv').config();
const connectDb = {
    host: process.env.DB_hOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  };
  const mysql=require('mysql')

  

const connection=mysql.createConnection(connectDb)
connection.connect((error)=>{
  if(error){
    console.log("error in connecting mysql",error);
  }
  else{
    console.log("mysql connected succesfully");
  }

})
  
  module.exports = connection;
  