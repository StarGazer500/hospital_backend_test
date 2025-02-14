const adminlogincontroller = require('../controllers/admin')
const express = require("express")

const adminloginrouter = express.Router()


adminloginrouter.post('/admin-login',adminlogincontroller)
module.exports = adminloginrouter

