const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');

exports.register = async (req, res) => {
    const { name, email, password, role, specialty } = req.body;
    try {
        let user;
        if (role === 'patient') {
            user = new Patient({ name, email, password });
        } else if (role === 'doctor') {
            user = new Doctor({ name, email, password, specialty });
        }
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        const payload = { user: { id: user.id, role } };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.login = async (req, res) => {
    const { email, password, role } = req.body;
    try {
        let user;
        if (role === 'patient') {
            user = await Patient.findOne({ email });
        } else if (role === 'doctor') {
            user = await Doctor.findOne({ email });
        }
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const payload = { user: { id: user.id, role } };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
