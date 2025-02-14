const dotenv = require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const {Patient} = require('../models/model')

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});


async function  generateContent (req,res){
    const patientId = req.body.patientId 
    const patient = await Patient.findOne({_id:patientId});
    const disease = patient.disease
    const drug_prescription = patient.drug_prescription
    const symptoms = patient.symptoms
    console.log(disease,drug_prescription,symptoms)

    try{
        // const prompt = "Create 5 funny and witty jokes about generative AI";
        const prompt = `The diagnosed disease:${disease} with the symptoms:${symptoms}has been assigned drug prespriptions as ${drug_prescription}.schedule a timer reminder for it`
        console.log("prompt is",prompt)
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        console.log(typeof text)
        res.status(200).send({
            response_message: text,
            status: 200
          });
        // res.send({"response_message":text});
    }
    catch(err){
        console.log(err);
        res.send("Unexpected Error!!!");
    }
}

module.exports = generateContent;
