// models/model.js
const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    specialization: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true, default: 'doctor' }
});

const AdminSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true, default: 'admin' }
});

const PatientSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    locality: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    telephone: { type: String, required: true },
    role: { type: String, default: 'patient' },
    disease: { type: String, required: true },
    symptoms: { type: String, required: true },
    drug_prescription: { type: String, required: true }
});

const Doctor = mongoose.model('Doctor', DoctorSchema);
const Admin = mongoose.model('Admin', AdminSchema);
const Patient = mongoose.model('Patient', PatientSchema);

module.exports = { Doctor, Admin, Patient };