// Service (PatientDetailsService)



const {generateAccessToken,generateRefreshToken} = require('../helper_functions')
const {Doctor} = require("../models/model");
const {verifyPassword} = require('../helper_functions')

async function DoctorDetailsService(Details) {
  try {
    const doctorModel = new Doctor(Details);
    await doctorModel.save();
    console.log("Doctor details saved successfully");
  } catch (err) {
    console.error("Error saving Doctor details:", err);
    throw new Error("Error saving Doctor details");
  }
}




async function DoctorLoginService(responseobject,params) {
    // console.log("hh")

    try {
        const { username, password,role } = params; // Get username and email from the URL parameters
    
        // Use findOne() to search for a patient by their username and email
        const doctor = await Doctor.findOne({ username: username});
       
        // If no patient is found, send a 404 response
        if (!doctor) {
          return responseobject.status(404).json({ message: 'Doctor not found' });
        }

        const isMatch = verifyPassword(password,doctor.password)
        console.log("ismatch",isMatch)
        if (!isMatch){
          return responseobject.status(402).json({ message: 'Password is not valid' });
        }
    

        const accessToken = await generateAccessToken(doctor)
        const refreshToken = await generateRefreshToken(doctor)
       
      
     
        responseobject.cookie('accessToken', accessToken, {
            httpOnly: true,  // Ensures the cookie is not accessible via JavaScript (security)
            // secure: process.env.NODE_ENV === 'production', // Set to true for HTTPS (recommended in production)
            maxAge: 15 * 60 * 1000, // The cookie expires in 15 minutes (same as the JWT expiration)
            sameSite: 'Lax' // Strict SameSite attribute to prevent CSRF attacks
          });

        //   console.log("cookie set",responseobject.c)

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

module.exports = {DoctorLoginService,DoctorDetailsService}