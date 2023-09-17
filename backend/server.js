const express = require('express');
const app = express();
const connectDb=require("./config/database")
const port =8080;
const userRoute=require("./Routes/User");
const routerr = require('./Routes/LR');
const admin=require('./Routes/admin')
const hospitals=require('./Routes/Hospital')
const donors=require('./Routes/donate')
const cors=require('cors')
require('dotenv').config();

app.use(cors())
app.use(express.json());
app.use("/",routerr);
app.use('/hospital',hospitals)

app.use('/admin',admin)
app.use("/user",userRoute)
app.use('/donor',donors)



// Define routes
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${port}`);
});



