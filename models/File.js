const mongoose = require("mongoose");
const nodemailer = require('nodemailer');
require("dotenv").config();


const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    imageUrl:{
        type : String,
    },
    tags:{
        type: String,
    },
    email:{
        type:String,
    }
});

//post middleware
fileSchema.post("save", async function(doc) {
    try{
        console.log("DOC", doc);
        //transpoter
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            },

        })
        let info = await transporter.sendMail({
            from:  `CodeHelp`,
            to: doc.email,
            subject: "New file uploaded on cloudinary",
            html: `<h2>Hello</h2> <p> file uploaded View here: <a href="${doc.imageUrl}"> ${doc.imageUrl} </a> </p>`,
        })
        console.log("info", info)
    
    }

    catch(error){ 
        console.error(error);
    }
})

const File = mongoose.model("File", fileSchema);
module.exports = File;