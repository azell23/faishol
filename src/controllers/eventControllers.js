const { events, comments, bookevent, users, Sequelize} = require("../models/");
const Op = Sequelize.Op;

module.exports = {
    getAllEvent : (req, res)=>{
        events.findAll({
            include: [{model: comments, include: {model: users, attributes: {exclude: ['password','createdAt','updatedAt']}}},{model: bookevent}],
            order: [['updatedAt', 'DESC']]
        })
        .then((data)=>{
            res.send({
                msg: "Success get all data",
                status: 200,
                data
            })
        })
        .catch ((err)=>{
            res.send({
                msg: 'Error to get all data',
                status:500,
                err,
            })
        })
    },
    getEventUser : (req, res)=>{
        let{email} = req.decodedToken;

        events.findAll({
            order: [['updatedAt', 'DESC']],
            where: {
                createdBy: email
            }
        })
        .then((data)=>{
            res.send({
                msg: "Success get data",
                status: 200,
                data
            })
        })
        .catch ((err)=>{
            res.send({
                msg: 'Error to get data',
                status:500,
                err,
            })
        })
    },
    SearchEvent : (req, res)=>{
        const {key} = req.params
        events.findAll({
            include: [{model: comments, include: {model: users, attributes: {exclude: ['password','createdAt','updatedAt']}}},{model: bookevent}],
            order: [['updatedAt', 'DESC']],
            where: {
                [Op.or]: [
                    {name: {[Op.iLike] : '%' + key + '%'}},
                    {deskripsi: {[Op.iLike] : '%' + key + '%'}},
                    {location: {[Op.iLike] : '%' + key + '%'}}
                ]
            }
        })
        .then((data)=>{
            res.send({
                msg: "Success search data",
                status: 200,
                data
            })
        })
        .catch ((err)=>{
            res.send({
                msg: 'Error to search data',
                status:500,
                err,
            })
        })
    },
    postEvent : (req, res)=>{
        let{body} = req;
        let{email} = req.decodedToken;
        let newData;
        
        if(req.image_surat != null && req.image_poster != null && req.pdf_file != null){
            newData = {
                ...body,
                image_poster: req.image_poster.url,
                image_surat: req.image_surat.url,
                pdf_file: req.pdf_file.url,
                createdBy: email
            }
        }else if(req.image_poster != null && req.image_surat != null){
            newData = {
                ...body,
                image_poster: req.image_poster.url,
                image_surat: req.image_surat.url,
                pdf_file: "kosong",
                createdBy: email
            }
        }else if(req.image_poster != null && req.pdf_file != null){
            newData = {
                ...body,
                image_poster: req.image_poster.url,
                image_surat: "kosong",
                pdf_file: req.pdf_file.url,
                createdBy: email
            }
        }else if(req.image_poster != null){
            newData = {
                ...body,
                image_poster: req.image_poster.url,
                image_surat: "kosong",
                pdf_file: "kosong",
                createdBy: email
            }
        }else if(req.image_surat != null){
            newData = {
                ...body,
                image_poster: "kosong",
                image_surat: req.image_surat.url,
                pdf_file: "kosong",
                createdBy: email
            }
        }else if(req.pdf_file != null){
            newData = {
                ...body,
                image_poster: "kosong",
                image_surat: "kosong",
                pdf_file: req.pdf_file.url,
                createdBy: email
            }
        }else{
            newData = {
                ...body,
                image_poster: "kosong",
                image_surat: "kosong",
                pdf_file: "kosong",
                createdBy: email
            }
        }
        console.log(newData)
        events.create(newData)
        .then((data)=>{
            res.status(200).send({
                msg: "Success to post data",
                status : 200,
                data
            })
        })
        .catch((err)=>{
            res.status(500).send({
                msg: 'Failed to post data',
                status: 500,
                err,
            })
        })
    },
    getEventById :(req,res)=>{
        let{ id }=req.params;
        events.findOne({
            where : {id},
            include: [{model: comments, include: {model: users, attributes: {exclude: ['password','createdAt','updatedAt']}}},{model: bookevent}]
        })
        .then ((data)=>{
            if(data == null){
                res.status(404).send({
                    msg: 'data is deleted or moved',
                    status:404,
                })
                return
            }else{
                res.status(200).send({
                    msg: 'Success get data By Id',
                    status:200,
                    data
                })
                return    
            }
        })
        .catch((err)=>{
            res.status(500).send({
                msg: 'Failed get data By Id',
                status: 500,
                err,
            })
        })
    },
    deleteEvent : async(req, res)=>{
        let{id}=req.params;
        let even = events.findByPk(id);
        if(!even){
            res.status(404).send({
                msg: 'data is deleted or moved',
                status: 404,
                data
            })
            return
        }
        await bookevent.destroy({
            where : {event_id: id}
        })
        await comments.destroy({
            where : {event_id: id}
        })
        events.destroy({
            where : {id},
        })
        .then((data)=>{
                res.status(200).send({
                    msg: 'Success delete data',
                    status: 200,
                    data
                })
        })
        .catch((err)=>{
            res.status(500).send({
                msg: 'Failed delete data',
                status: 500,
                err,
            })
        })
    },
    updateEvent: (req, res)=>{
        let{id}=req.params;
        let{body} = req;
        let{email} = req.decodedToken;
        let newData;
        
        if(req.image_surat != null && req.image_poster != null && req.pdf_file != null){
            newData = {
                ...body,
                image_poster: req.image_poster.url,
                image_surat: req.image_surat.url,
                pdf_file: req.pdf_file.url,
            }
        }else if(req.image_poster != null && req.image_surat != null){
            newData = {
                ...body,
                image_poster: req.image_poster.url,
                image_surat: req.image_surat.url,
                pdf_file: "kosong",
            }
        }else if(req.image_poster != null && req.pdf_file != null){
            newData = {
                ...body,
                image_poster: req.image_poster.url,
                image_surat: "kosong",
                pdf_file: req.pdf_file.url,
            }
        }else if(req.image_poster != null){
            newData = {
                ...body,
                image_poster: req.image_poster.url,
                image_surat: "kosong",
                pdf_file: "kosong",
            }
        }else if(req.image_surat != null){
            newData = {
                ...body,
                image_poster: "kosong",
                image_surat: req.image_surat.url,
                pdf_file: "kosong",
            }
        }else if(req.pdf_file != null){
            newData = {
                ...body,
                image_poster: "kosong",
                image_surat: "kosong",
                pdf_file: req.pdf_file.url,
            }
        }else{
            newData = {
                ...body,
                createdBy: email
            }
        }
        events.update(newData,{
            where: {id}
        })
        .then((data)=>{
            res.status(200).send({
                msg: "Success to update data",
                status : 200,
                data
            })
        })
        .catch((err)=>{
            res.status(500).send({
                msg: 'Failed to update data',
                status: 500,
                err,
            })
        })

    },
}