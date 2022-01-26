const mongoose = require('mongoose')

mongoose.Promise = global.Promise;

// FIXME: The second argument (object) may not be necessary. Just added it.
mongoose.connect(process.env.MONGO_DB_HOST || 3000, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log("MongoDB Connected."))
.catch((error) => {
    console.log(error);
})

module.exports = {
    mongoose
}