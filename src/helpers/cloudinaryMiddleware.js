const cloudinary = require('cloudinary').v2;
const crypto = require("crypto")
const fs = require('fs');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadCloudinary = async (req,res,next)=>{

    if(req.file != null){
        console.log(req.file)
        await cloudinary.uploader.upload(
            req.file.path,
            {
                resource_type:'raw',
                folder:'faisol',
                public_id: `faisol-${crypto.randomBytes(25).toString('hex')}`,
                tags: `express-cloudinary`,
            },
            (err,image)=>{
                if(err) return res.status(500).send(err);
                console.log("File uploaded to cloudinary")
    
                fs.unlinkSync(req.file.path);
                req.image_profile = image;
                next();
            }
        )
    }else if(req.files != null && req.files.image_poster != null && req.files.image_surat != null && req.files.pdf_file != null){
        console.log(req.files)
        await cloudinary.uploader.upload(
            req.files.image_poster[0].path,
            {
                resource_type:'raw',
                folder:'faisol',
                public_id: `faisol-${crypto.randomBytes(25).toString('hex')}`,
                tags: `express-cloudinary`,
            },
            (err,image_poster)=>{
                if(err) return res.status(500).send(err);
                console.log("File image_poster to cloudinary")
    
                fs.unlinkSync(req.files.image_poster[0].path);
                req.image_poster = image_poster;
            }
        )
        await cloudinary.uploader.upload(
            req.files.image_surat[0].path,
            {
                resource_type:'raw',
                folder:'faisol',
                public_id: `faisol-${crypto.randomBytes(25).toString('hex')}`,
                tags: `express-cloudinary`,
            },
            (err,image_surat)=>{
                if(err) return res.status(500).send(err);
                console.log("File image_surat to cloudinary")
    
                fs.unlinkSync(req.files.image_surat[0].path);
                req.image_surat = image_surat;
            }
        )
        await cloudinary.uploader.upload(
            req.files.pdf_file[0].path,
            {
                resource_type:'raw',
                folder:'faisol',
                public_id: `faisol-${crypto.randomBytes(25).toString('hex')}`,
                tags: `express-cloudinary`,
            },
            (err,pdf_file)=>{
                if(err) return res.status(500).send(err);
                console.log("File pdf_file to cloudinary")
    
                fs.unlinkSync(req.files.pdf_file[0].path);
                req.pdf_file = pdf_file;
                next()
            }
        )
    }else if(req.files != null && req.files.image_poster != null && req.files.image_surat != null && req.files.pdf_file == null){
        console.log(req.files)
        await cloudinary.uploader.upload(
            req.files.image_poster[0].path,
            {
                resource_type:'raw',
                folder:'faisol',
                public_id: `faisol-${crypto.randomBytes(25).toString('hex')}`,
                tags: `express-cloudinary`,
            },
            (err,image_poster)=>{
                if(err) return res.status(500).send(err);
                console.log("File image poster to cloudinary")
    
                fs.unlinkSync(req.files.image_poster[0].path);
                req.image_poster = image_poster;
            }
        )
        await cloudinary.uploader.upload(
            req.files.image_surat[0].path,
            {
                resource_type:'raw',
                folder:'faisol',
                public_id: `faisol-${crypto.randomBytes(25).toString('hex')}`,
                tags: `express-cloudinary`,
            },
            (err,image_surat)=>{
                if(err) return res.status(500).send(err);
                console.log("File image_surat to cloudinary")
    
                fs.unlinkSync(req.files.image_surat[0].path);
                req.image_surat = image_surat;
            }
        )
        next();
    }else if(req.files != null && req.files.image_poster != null && req.files.image_surat == null && req.files.pdf_file != null){
        console.log(req.files)
        await cloudinary.uploader.upload(
            req.files.image_poster[0].path,
            {
                resource_type:'raw',
                folder:'faisol',
                public_id: `faisol-${crypto.randomBytes(25).toString('hex')}`,
                tags: `express-cloudinary`,
            },
            (err,image_poster)=>{
                if(err) return res.status(500).send(err);
                console.log("File image poster to cloudinary")
    
                fs.unlinkSync(req.files.image_poster[0].path);
                req.image_poster = image_poster;
            }
        )
        await cloudinary.uploader.upload(
            req.files.pdf_file[0].path,
            {
                resource_type:'raw',
                folder:'faisol',
                public_id: `faisol-${crypto.randomBytes(25).toString('hex')}`,
                tags: `express-cloudinary`,
            },
            (err,pdf_file)=>{
                if(err) return res.status(500).send(err);
                console.log("File pdf_file to cloudinary")
    
                fs.unlinkSync(req.files.pdf_file[0].path);
                req.pdf_file = pdf_file;
            }
        )
        next();
    }else if(req.files != null && req.files.image_poster == null && req.files.image_surat != null && req.files.pdf_file != null){
        console.log(req.files)
        await cloudinary.uploader.upload(
            req.files.image_surat[0].path,
            {
                resource_type:'raw',
                folder:'faisol',
                public_id: `faisol-${crypto.randomBytes(25).toString('hex')}`,
                tags: `express-cloudinary`,
            },
            (err,image_surat)=>{
                if(err) return res.status(500).send(err);
                console.log("File image surat to cloudinary")
    
                fs.unlinkSync(req.files.image_surat[0].path);
                req.image_surat = image_surat;
            }
        )
        await cloudinary.uploader.upload(
            req.files.pdf_file[0].path,
            {
                resource_type:'raw',
                folder:'faisol',
                public_id: `faisol-${crypto.randomBytes(25).toString('hex')}`,
                tags: `express-cloudinary`,
            },
            (err,pdf_file)=>{
                if(err) return res.status(500).send(err);
                console.log("File pdf_file to cloudinary")
    
                fs.unlinkSync(req.files.pdf_file[0].path);
                req.pdf_file = pdf_file;
            }
        )
        next();
    }else if(req.files != null && req.files.image_poster != null && req.files.image_surat == null && req.files.pdf_file == null){
        console.log(req.files)
        await cloudinary.uploader.upload(
            req.files.image_poster[0].path,
            {
                resource_type:'raw',
                folder:'faisol',
                public_id: `faisol-${crypto.randomBytes(25).toString('hex')}`,
                tags: `express-cloudinary`,
            },
            (err,image_poster)=>{
                if(err) return res.status(500).send(err);
                console.log("File image poster to cloudinary")
    
                fs.unlinkSync(req.files.image_poster[0].path);
                req.image_poster = image_poster;
            }
        )
        next();
    }else if(req.files != null && req.files.image_poster == null && req.files.image_surat != null && req.files.pdf_file == null){
        console.log(req.files)
        await cloudinary.uploader.upload(
            req.files.image_surat[0].path,
            {
                resource_type:'raw',
                folder:'faisol',
                public_id: `faisol-${crypto.randomBytes(25).toString('hex')}`,
                tags: `express-cloudinary`,
            },
            (err,image_surat)=>{
                if(err) return res.status(500).send(err);
                console.log("File image_surat to cloudinary")
    
                fs.unlinkSync(req.files.image_surat[0].path);
                req.image_surat = image_surat;
            }
        )
        next();
    }else if(req.files != null && req.files.image_poster == null && req.files.image_surat == null && req.files.pdf_file != null){
        console.log(req.files)
        await cloudinary.uploader.upload(
            req.files.pdf_file[0].path,
            {
                resource_type:'raw',
                folder:'faisol',
                public_id: `faisol-${crypto.randomBytes(25).toString('hex')}`,
                tags: `express-cloudinary`,
            },
            (err,pdf_file)=>{
                if(err) return res.status(500).send(err);
                console.log("File pdf_file to cloudinary")
    
                fs.unlinkSync(req.files.pdf_file[0].path);
                req.pdf_file = pdf_file;
            }
        )
        next();
    }else{
        next();
    }
    
}
module.exports = uploadCloudinary;