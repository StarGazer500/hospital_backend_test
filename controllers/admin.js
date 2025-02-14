const Adminlgoinservice = require('../services/admin')


 async function HandleAdminLogin(req,res) {

   const {
 
      username,
      password,
      role,
    } = req.body;

   try {
      // Wait for PatientDetailsService to save the data
      await Adminlgoinservice(res,{
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
    

   res.status(200).send({"message":"logged in successfully"});
    
 }



 

 module.exports = HandleAdminLogin


