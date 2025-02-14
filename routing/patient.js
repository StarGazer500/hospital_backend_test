const {HandlePatientRecords,HandlePatientLogin} = require('../controllers/patient')
const {authenticateTokenMiddleware} = require('../helper_functions')
const express = require("express")

const patientdetailsrouter = express.Router()

patientdetailsrouter.post('/patient-records',authenticateTokenMiddleware,HandlePatientRecords)
module.exports = patientdetailsrouter


const patientloginrouter = express.Router()

patientloginrouter .post('/patient-login',HandlePatientLogin)
module.exports = {patientloginrouter,patientdetailsrouter} 