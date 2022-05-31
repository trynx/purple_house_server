const mongoose = require("mongoose");
// For more info: https://www.npmjs.com/package/config
const config = require("config");
const db = config.get("mongoURI");

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
        });

        console.log(`MongoDB is connected at ${db}`);
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
