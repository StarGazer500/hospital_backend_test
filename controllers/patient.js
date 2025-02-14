const {PatientLoginService,PatientDetailsService}= require("../services/patient")

const {hashPassword} = require('../helper_functions')

// Controller
async function HandlePatientRecords(req, res) {
    const {
        firstname,
        lastname,
        locality,
        username,
        password,
        gender,
        email,
        telephone,
        role,
        disease,
        symptoms,
        drug_prescription
      } = req.body;
    
      const hashed_pwd = await hashPassword(password)

      try {
        // Wait for PatientDetailsService to save the data
        await PatientDetailsService({
            firstname,
            lastname,
            locality,
            username,
            password:hashed_pwd,
            gender,
            email,
            telephone,
            role,
            disease,
            symptoms,
            drug_prescription
        });
    
        // Send a success response
        res.status(201).send({
          message: "Patient details saved successfully",
          status: 201
        });
      } catch (err) {
        // Send a failure response if something goes wrong
        console.error(err);
        res.status(500).send({
          message: "Error saving patient details",
          error: err.message,
          status: 500
        });
      }
    }
    
    
    



   


    async function HandlePatientLogin(req,res) {
   
      const {
         username,
         password,
     
         role,
       
       } = req.body;
   
      try {
         // Wait for PatientDetailsService to save the data
         await PatientLoginService(res,{
           username,
           password,
           role,
         });
   
         // console.log('Cookies Set:');
         // console.log(res.headers['set-cookie']); 
          
         // Send a success response
         res.status(200).send({
           message: "Logged in Successfully",
           status: 200
         });
       } catch (err) {
         // Send a failure response if something goes wrong
         console.error(err);
         res.status(500).send({
           message: "Error during login",
           error: err.message,
           status: 500
         });
       }
       
   
    //   res.status(200).send({"message":"logged in successfully"});
       
    }
   
   
    module.exports = {HandlePatientRecords,HandlePatientLogin}
   



 