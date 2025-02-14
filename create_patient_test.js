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
        await Patient.deleteMany({});
        // await Doctor.deleteMany({});
    });

    

    describe('POST /login-records', () => {
        const validDoctor = {
            
            username: 'testdoctor',
            password: 'password123',
            role:'doctor'
          
           
        };

        it('Login Doctor and Create Patient Details', async () => {
            const doctoresponse = await request(app)
                .post('/doctor-login')
                .send(validDoctor);
              

            expect(doctoresponse.status).to.equal(200);
            expect(doctoresponse.body).to.have.property('message', 'Logged in Successfully');

            const cookies = doctoresponse.headers['set-cookie'];

            expect(cookies).to.not.be.undefined;
            expect(cookies).to.have.lengthOf(2); 

            const validPatient = {
                        firstname: 'Test',
                        lastname: 'Patient',
                        locality: 'Test City',
                        username: 'testpatient',
                        password: 'password123',
                        gender: 'Male',
                        email: 'test@test.com',
                        telephone: '1234567890',
                        disease: 'Fever',
                        symptoms: 'High temperature',
                        drug_prescription: 'Paracetamol 3times, gebedol 3 times a day and amosasline 3 times'
             };
            

            const patienceresponse = await request(app)
                .post('/patient-records')
                .send(validPatient)
                .set('Cookie', cookies)  // Send cookies along with the request
                

            expect(patienceresponse.status).to.equal(201);
            expect(patienceresponse.body).to.have.property('message', 'Patient details saved successfully');
        


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