const mongoose = require("mongoose");
// For more info: https://www.npmjs.com/package/config
const config = require("config");
let dbUrl = config.get("mongoURI");

const { MongoMemoryServer } = require("mongodb-memory-server");
let mongod = null;

const exit = (msg) => {
    console.error(msg);
    process.exit(1);
};

const connectDB = async () => {
    try {
        // There is already a connection to MongoDB
        if (mongoose.connection.readyState === 1) {
            dbUrl = mongod ? mongod.getUri() : dbUrl;

            console.log(`Already connected to MongoDB at ${dbUrl}`);
            return;
        }

        if (process.env.NODE_ENV === "test") {
            mongod = await MongoMemoryServer.create();
            dbUrl = mongod.getUri();
        }

        await mongoose.connect(dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`MongoDB is connected at ${dbUrl}`);
    } catch (err) {
        exit(err.message);
    }
};

const disconnectDB = async () => {
    try {
        await mongoose.connection.close();

        if (mongod) {
            await mongod.stop();
        }
    } catch (err) {
        exit(err.message);
    }
};

module.exports = { connectDB, disconnectDB };
