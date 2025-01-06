const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = async () => {
   try 
   { 
    await mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    console.log("DB connection successful");
}
    catch(error){
        console.error("Database connection failed:", error);
        process.exit(1);
    }
}