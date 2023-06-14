const multer = require('multer');
const path = require("path");
const crypto = require("crypto")

const storage = multer.diskStorage({
    destination: (req,filename,callback)=>{
        callback(null,'./public/files/')
    },
    filename: function(req, file, cb){
        crypto.randomBytes(20, (err, buf) => {
          cb(null, buf.toString("hex") + path.extname(file.originalname))
        })
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1000 * 1000},
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.pdf' && ext !== '.jpeg') {
            return callback(new Error('.pdf .jpg .jpeg'))
        }
        callback(null, true)
    },
});

const multiUpload = (req,res,next) =>{
    const uploadImage = upload.fields([{
        name: 'image_poster', maxCount: 1
      }, {
        name: 'image_surat', maxCount: 1
      }, {
        name: 'pdf_file', maxCount: 1
      }]);
    uploadImage(req,res,(err)=>{
        if(err){
            res.status(500).send({
                status: 500,
                message: "tipe file ne salah wa",
                err
            })
            return
        } else{
            next();
        }
    });
};

module.exports = multiUpload;