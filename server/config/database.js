const mongoose = require('mongoose')
require('dotenv').config();


const Dbconnect = () => {
    mongoose.connect(process.env.DB_URL).then(() => {
        console.log("DB connected Successfully");
    }).catch((error) => {
        console.log("DB connection Failed");
        console.error(error);
        process.exit(1)
    })
}

module.exports = Dbconnect