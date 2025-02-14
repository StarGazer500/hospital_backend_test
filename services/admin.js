const {Admin} = require("../models/model");
const {generateAccessToken,generateRefreshToken} = require('../helper_functions')


async function AdminLoginService(responseobject,params) {

    try {
        const { username, password,role } = params; // Get username and email from the URL parameters
    
        // Use findOne() to search for a patient by their username and email
        const admin = await Admin.findOne({ username: username, password: password,role: role });
    
        // If no patient is found, send a 404 response
        if (!admin) {
          return responseobject.status(404).json({ message: 'Patient not found' });
        }

        const accessToken = await generateAccessToken(admin)
        const refreshToken = await generateRefreshToken(admin)
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

module.exports = AdminLoginService


