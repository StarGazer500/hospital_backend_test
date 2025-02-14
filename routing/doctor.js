const {HandleDoctorRecords,HandleDoctorLogin} = require('../controllers/doctor')
const {authenticateTokenMiddleware} = require('../helper_functions')
const express = require("express")

const doctordetailsrouter = express.Router()

doctordetailsrouter.post('/doctor-records',authenticateTokenMiddleware,HandleDoctorRecords)


// 
const doctordloginrouter = express.Router()

doctordloginrouter.post('/doctor-login',HandleDoctorLogin)
module.exports = {doctordloginrouter,doctordetailsrouter}