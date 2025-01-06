const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

//middleware adding
app.use(express.json());

const fileupload = require("express-fileupload");

app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

//db connection
const db = require("./config/database");
db.connect();

//cloud connect
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

//mounting api route
const Upload = require("./routes/FileUpload");
app.use("/api/v1/upload" , Upload);

//activate server
app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`);
})