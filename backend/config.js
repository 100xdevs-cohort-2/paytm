const mongoose = require('mongoose');

async function connectToMongoDb(connection_url) {
    try {
        await mongoose.connect(connection_url);
        console.log("Connected to MongoDB successfully!");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

module.exports = {
    connectToMongoDb,
}