const mongoose = require('mongoose');
require('dotenv').config();

const { MONGODB_URI, MONGODB_PASS, MONGODB_USER } = process.env;
const connect = async () => {
    try {
        await mongoose.connect(MONGODB_URI, {
            pass: MONGODB_PASS,
            user: MONGODB_USER,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.log('Error connecting to MongoDB', err);
        process.exit(1);
    }
}

module.exports = connect;