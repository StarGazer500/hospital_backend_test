const express = require("express")
const gemini = require('../controllers/gemini')

const geminirouter = express.Router()
geminirouter.post('/gemini-chat',gemini)
module.exports = geminirouter