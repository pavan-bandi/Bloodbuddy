 


const jwt = require("jsonwebtoken");
require('dotenv').config();
const authenticateandAuth = (...roles) => {
  return (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    console.log(token)
    if (token == null) {
      return res.sendStatus(401);
    } else {
      jwt.verify(
        token,
        process.env.SECRET,
        (err, decodedData) => {
          if (err) {
            console.log(err)
            return res.sendStatus(403);
          }

          if (!roles.includes(decodedData.userType)) {
            console.log(decodedData)
            return next(
              `Role: ${decodedData.userType} is not allowed to access this resource`,
              403
            );
          }

          req.locals = decodedData;
          

          next();
        }
      );
    }
  };
  
};

module.exports={authenticateandAuth}
