const mongoose = require('mongoose')

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGO_DB_HOST)
.then(() => console.log("MongoDB Connected."))
.catch((error) => {
    console.log(error);
})

module.exports = {
    mongoose
}