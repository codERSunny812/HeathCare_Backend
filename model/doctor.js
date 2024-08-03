const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    specialty: String,
    appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }]
});

module.exports = mongoose.model('Doctor', DoctorSchema);
