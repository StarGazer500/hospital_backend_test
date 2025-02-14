const {DoctorLoginService,DoctorDetailsService}= require("../services/doctor")

const {hashPassword} = require('../helper_functions')
// Controller
async function HandleDoctorRecords(req, res) {
    const {
      firstname,
      lastname,
      specialization,
      username,
      password,
      gender,
      email,
      role
     
      
    } = req.body;

    const hashed_pwd = await hashPassword(password)
    console.log("hashed password",hashed_pwd)
  
    try {
      // Wait for PatientDetailsService to save the data
      await DoctorDetailsService({
        firstname,
        lastname,
        specialization,
        username,
        password:hashed_pwd,
        gender,
        email,
        role
      });
  
      // Send a success response
      res.status(201).send({
        message: "Doctor details saved successfully",
        status: 201
      });
    } catch (err) {
      // Send a failure response if something goes wrong
      console.error(err);
      res.status(500).send({
        message: "Error saving Doctor details",
        error: err.message,
        status: 500
      });
    }
  }
  
//   

async function HandleDoctorLogin(req,res) {

    const {
     
        username,
        password,
        role
     } = req.body;


 
    try {
       // Wait for PatientDetailsService to save the data
       await DoctorLoginService(res,{
         username,
         password,
         role,
       });
 
       
        
    //    // Send a success response
    //    res.status(200).send({
    //      message: "Logged in Successfully",
    //      status: 200
    //    });

       return res.status(200).json({
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
     
 
    // res.status(200).send({"message":"logged in successfully"});
     
  }

 module.exports={HandleDoctorRecords,HandleDoctorLogin}