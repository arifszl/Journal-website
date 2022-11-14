const mongoose = require("mongoose")
const dbUrl = "mongodb://localhost:27017/BlogDB" //every thing fixed just change ecommerce 

mongoose
    .connect(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .catch((err) => {
        console.log(err);
    });

mongoose.connection.on("connected", () => {
    console.log("Mongoose connected");
});