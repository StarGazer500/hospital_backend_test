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
        await Doctor.deleteMany({});
    });

    

    describe('POST /admin-login', () => {
        const validAdmin = {
            
            username: 'Joe1',
            password: '1234',
            role:'admin',
           
        };

        it('Login Admin and and Create Admin Account', async () => {
            const adminresponse = await request(app)
                .post('/admin-login')
                .send(validAdmin);

            expect(adminresponse.status).to.equal(200);
            expect(adminresponse.body).to.have.property('message', "Logged in Successfully");

            const cookies = adminresponse.headers['set-cookie'];
            console.log(cookies)

            expect(cookies).to.not.be.undefined;
            expect(cookies).to.have.lengthOf(2); 
            
     


        const validDoctor = {
            firstname: 'Test',
            lastname: 'doctor',
            specialization:"Onchology",
            username: 'testdoctor',
            password: 'password123',
            gender: 'Male',
            email: 'test@test.com',
            role:'doctor'
           
          
           
        };

        console.log(validDoctor)

      
            const doctorresponse = await request(app)
                .post('/doctor-records')
                .send(validDoctor)
                .set('Cookie', cookies)  // Send cookies along with the request\\

                .send(validDoctor);
                // console.log(validDoctor)

            expect(doctorresponse.status).to.equal(201);
            expect(doctorresponse.body).to.have.property('message', 'Doctor details saved successfully');
      
});

    })


    

 
    after(async () => {
        try {
            await mongoose.connection.close();
            console.log('Database connection closed');
        } catch (error) {
            console.error('Error closing database connection:', error);
        }
    });
});