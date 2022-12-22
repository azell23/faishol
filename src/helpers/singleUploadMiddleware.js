const multer = require('multer');
const path = require("path");

const storage = multer.diskStorage({
    destination: (req,filename,callback)=>{
        callback(null,'./public/files')
    },
    filename:(req,file,callback)=>{
        const nameFormat = `${Date.now()}-${file.fieldname}${path.extname(
            file.originalname
        )}`;
        callback(null, nameFormat);
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 2 * 1000 * 1000},
});

const singleUpload = (req,res,next) =>{
    const uploadImage = upload.single("image_profile")
    uploadImage(req,res,(err)=>{
        if(err){
            res.status(500).send({
                status: 500,
                message: "file max 2mb",
                error: err
            })
            return
        } else{
            next();
        }
    });
};

module.exports = singleUpload;