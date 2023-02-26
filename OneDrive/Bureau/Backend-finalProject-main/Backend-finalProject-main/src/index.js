const express = require("express")
const app = express()
const serverless = require("serverless-http")

// importing the dot env module
// require("dotenv").config();

// // extract the port from the env file
// const PORT = process.env.PORT || 5000

// //importing the connectdb function to connect to the data base
// const connectDB = require("./config/connectDB")
// connectDB();

// //make the request body readable
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use("/auth", require("./routes/Auth"));
// app.use("/playlists",require("./routes/playlistPages"))
// app.use("/songs",require("./routes/musicCrude"))
// app.use("/albums",require("./routes/albumPages"))
const router = express.Router()

router.get('/',(req,res)=>{
    res.json({"hello":"hi"})
})
app.use('/.netlify/functions/index',router)

module.exports.handler = serverless(app)




