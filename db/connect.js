const mongoose = require("mongoose");

// const url = "mongodb+srv://bonucci64:<password>@cluster0.fjfhd.mongodb.net/?retryWrites=true&w=majority"


const connectDB =  (url) => {
  return  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
}
    

module.exports = connectDB