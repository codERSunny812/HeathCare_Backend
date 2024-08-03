const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
    date: Date,
    status: { type: String, default: 'pending' }
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
