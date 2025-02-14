const {Patient} = require("../models/model");
const {generateAccessToken,generateRefreshToken} = require('../helper_functions')
const {verifyPassword} = require('../helper_functions')


async function PatientLoginService(responseobject,params) {

    try {
        const { username, password,role } = params; // Get username and email from the URL parameters
    
        // Use findOne() to search for a patient by their username and email
        const patient = await Patient.findOne({ username: username });
    
        // If no patient is found, send a 404 response
        if (!patient) {
          return responseobject.status(404).json({ message: 'Patient not found' });
        }

        const isMatch = verifyPassword(password,patient.password)
        if (!isMatch){
          return responseobject.status(402).json({ message: 'Password is not valid' });
        }

        const accessToken = await generateAccessToken(patient)
        const refreshToken = await generateRefreshToken(patient)
        // console.log(accessToken)
        

        responseobject.cookie('accessToken', accessToken, {
            httpOnly: true,  // Ensures the cookie is not accessible via JavaScript (security)
            // secure: process.env.NODE_ENV === 'production', // Set to true for HTTPS (recommended in production)
            maxAge: 15 * 60 * 1000, // The cookie expires in 15 minutes (same as the JWT expiration)
            sameSite: 'Lax' // Strict SameSite attribute to prevent CSRF attacks
          });

       

          responseobject.cookie('refreshToken', refreshToken, {
            httpOnly: true,  // Ensures the cookie is not accessible via JavaScript (security)
            // secure: process.env.NODE_ENV === 'production', // Set to true for HTTPS (recommended in production)
            maxAge: 60 * 60 * 1000 * 24 * 7, // The cookie expires in & days (same as the JWT expiration)
            sameSite: 'Lax' // Strict SameSite attribute to prevent CSRF attacks
          });


    
        // If a patient is found, return the patient details
        
      } catch (err) {
        // Handle any errors that may occur
        console.error(err);
        responseobject.status(500).json({ message: 'Server error', error: err.message });
      }
    
}




async function PatientDetailsService(Details) {
  try {
    const patientModel = new Patient(Details);
    await patientModel.save();
    console.log("Patient details saved successfully");
  } catch (err) {
    console.error("Error saving patient details:", err);
    throw new Error("Error saving patient details");
  }
}



module.exports = {PatientLoginService,PatientDetailsService}


