// test.js
const mongoose = require('mongoose');

describe('API Test', () => {
    let expect, request, app, Patient;

    before(async () => {
        const { expect: chaiExpect } = await import('chai');
        expect = chaiExpect;
        request = (await import('supertest')).default;
        
        app = require('./index');
        const models = require('./models/model');
        Patient = models.Patient;
        Doctor = models.Doctor

        process.env.NODE_ENV = 'test';
        
        try {
            await mongoose.connect(process.env.CONNECTION_STRING, {
              
            });
            console.log('Test database connected');
        } catch (error) {
            console.error('Database connection error:', error);
            throw error;
        }
    });

    beforeEach(async () => {
        // await Patient.deleteMany({});
        // await Doctor.deleteMany({});
    });


    describe('POST /test-gemini', () => {
  
        const patientId = "67afc7aa1e1adda9baea720a";
        it('Test Gemini Ai', async () => {
            const promptresponse = await request(app)
                .post('/gemini-chat')
                .send({patientId});

            console.log("gemini response message",promptresponse.body.response_message)
              

            // expect(patientresponse.status).to.equal(200);
            // expect(patientresponse.body).to.have.property('message', 'Logged in Successfully');

            // const cookies = patientresponse.headers['set-cookie'];

            // expect(cookies).to.not.be.undefined;
            // expect(cookies).to.have.lengthOf(2); 

          
            

        
        


        });
    });


    after(async () => {
        try {
            await mongoose.connection.close();
            console.log('Database connection closed');
        } catch (error) {
            console.error('Error closing database connection:', error);
        }
    });
});