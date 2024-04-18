const mongoose = require('mongoose');


// main() is called, preassumely starts the main logic of the applciation
// if main resolves successfully, the code following  it will be executed. If not, it will terminate with an error message
main().catch(err => console.log(err));

async function connectDb() {
    try {
        await mongoose.connect('mongodb://localhost:27017/test');
        console.log('Connected to MongoDB');
    }
    catch (error) {
        console.error("Connection to mongodb failed", error.message);
        process.exit(1); //Exit process with failure
    }
}

module.exports = connectDb();