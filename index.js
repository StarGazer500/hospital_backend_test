const cookieParser = require('cookie-parser');

const  express = require('express');

const dotenv = require('dotenv')
const dbconnect = require('./dbconnect/db_config')
const  cors = require("cors")
dotenv.config()
var app = express();

const {patientloginrouter,patientdetailsrouter} = require('./routing/patient')
const {doctordloginrouter,doctordetailsrouter} = require('./routing/doctor')
const admindetailsrouter = require('./routing/admin')
const geminirouter = require('./routing/gemini_ai')

const Port = process.env.Port||5002

app.use(cors({
    origin: process.env.CLIENT_URL,  // Use the value from .env for CORS
    credentials: true,  // This is required to send cookies in the request
  }));
  
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
app.use(express.json())

app.use('/',admindetailsrouter)
app.use('/',doctordloginrouter)
app.use('/',doctordetailsrouter)
app.use('/',patientdetailsrouter)
app.use('/',patientloginrouter)
app.use('/',geminirouter)

// app.use('/',farmerrouter)
app.listen(Port,()=>{
    dbconnect()
    
    console.log("The server is running on port",Port)})

module.exports = app;