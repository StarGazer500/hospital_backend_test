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
            await mongoose.connect(process.env.connection_string, {
              
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


    describe('POST /login-records', () => {
        const validPatient = {
           
            username: 'testpatient',
            password: 'password123',
            role:"patient"
 }

        it('Test Patient Login', async () => {
            const patientresponse = await request(app)
                .post('/patient-login')
                .send( validPatient);
              

            expect(patientresponse.status).to.equal(200);
            expect(patientresponse.body).to.have.property('message', 'Logged in Successfully');

            const cookies = patientresponse.headers['set-cookie'];

            expect(cookies).to.not.be.undefined;
            expect(cookies).to.have.lengthOf(2); 

          
            

        
        


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