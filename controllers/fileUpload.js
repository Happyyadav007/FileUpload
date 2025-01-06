const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

//localfileupload handler function

exports.localFileUpload = async (req,res) =>{
    try{
        //fetch file
        const file = req.files.file;
        console.log("file", file);
        let path = __dirname + "/files/" + Date.now() + "." +`${file.name.split('.')[1]}`;
        console.log("PATH ->", path);
        file.mv(path, (err) => {
        console.log(err);
        }); 
        res.json({
            success:true,
            message:"local file uploaded successfully",
        });
    }
    catch(error){
        console.log("Not able to upload the file on server")
        console.log(error);
    }
}

function isFileType(fileType, supportedTypes){
    return supportedTypes.includes(fileType);
}
async function uploadFileCloudinary(file, folder, quality){
    const options = {folder};
    if(quality){
        options.quality = quality;
    }
    console.log('temp file path', file.tempFilePath);
    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

//image upload handler function
exports.imageUpload = async (req, res) =>{
    try{
        //fetch file
        const {name, tags, email} = req.body;
        console.log(name,tags,email);
        const file = req.files.imageFile;
        console.log("file", file);

        //validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log(fileType);
        if(!isFileType(fileType, supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"Please upload a valid image file",
            })
        }
        //upload file to cloudinary
        const response = await uploadFileCloudinary(file, "Test");
        console.log(response);
        //db entry
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl : response.secure_url
        })
        res.json({
            success:true,
            imageUrl : response.secure_url,
            message:"Image uploaded successfully",
        })
    }

    catch(error){
        console.error(error)
        res.status(400).json({
            success:false,
            message:"Something went wrong",
            })
    }
}

//videoupload handler
exports.videoUpload = async (req,res) => {
    try{
        //fetch file
        const {name, tags, email} = req.body;
        console.log(name,tags,email);
        const file = req.files.videoFile;

        //validation
        const supportedTypes = ["mp4", "mov"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log(fileType);
        if(!isFileType(fileType, supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"Please upload a valid video file",
            })
        }
        //upload file to cloudinary
        const response = await uploadFileCloudinary(file, "Test");
        console.log(response);
        //db entry
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl : response.secure_url
        })
        res.json({
            success:true,
            imageUrl : response.secure_url,
            message:"Video uploaded successfully",
        })
    }
    catch(error){
        console.error(error)
        res.status(400).json({
            success:false,
            message:"Something went wrong 2",
        })
    }
}

exports.imageSizeReducer = async (req,res)=>{
    try{
        //fetch file
        const {name, tags, email} = req.body;
        console.log(name,tags,email);
        const file = req.files.imageFile;
        console.log("file", file);

         //validation
         const supportedTypes = ["jpeg", "jpg"];
         const fileType = file.name.split('.')[1].toLowerCase();
         console.log(fileType);
         if(!isFileType(fileType, supportedTypes)){
             return res.status(400).json({
                 success:false,
                 message:"Please upload a valid file",
             })
         }
         //upload file to cloudinary
         const response = await uploadFileCloudinary(file, "Test", 20);
         console.log(response);
         //db entry
         const fileData = await File.create({
             name,
             tags,
             email,
             imageUrl : response.secure_url
         })
         res.json({
             success:true,
             imageUrl : response.secure_url,
             message:"file uploaded successfully",
         })
     }
    catch(error){
        console.error(error);
        res.status(400).json({
            success: false,
            message: "Something went wrong",
        })
    }

}