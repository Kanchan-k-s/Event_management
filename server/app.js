
const express = require("express")
const cors = require("cors");
const { connectDB } = require("./config/dbconfig");
require('dotenv').config()

const organizer = require("./routes/organizerRoutes")

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: false }));
app.use(cors())

app.get('/hi',async(req,res)=>{
    res.send('hi')
})

app.use('/organizer', organizer);


//scripts to start the server
const startServer = async function () {
    try {
      await connectDB();
      const server = app.listen(port, () => {
        // console.log(process.env.URI, process.env.PORT)
        console.log("Server is running on port :", port);
      });
      
    } catch (error) {
      console.log("Error in starting the server .");
    }
  };
  
startServer();