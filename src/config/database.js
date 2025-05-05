 
const mongoose = require('mongoose');

const connectDB = async () => {
    // console.log(process.env.DATABASE_URI)
    try {
        await mongoose.connect(process.env.DATABASE_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB Connected");
    } catch (err) {
        console.error(err.message);
        process.exit(1); // Exit if connection fails
    }
};

module.exports = connectDB;
