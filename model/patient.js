const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }],
    prescriptions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Prescription' }]
});

module.exports = mongoose.model('Patient', PatientSchema);
