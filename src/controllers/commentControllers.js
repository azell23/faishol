const { comments, users } = require("../models/");

module.exports = {
    getCommentById : (req, res)=>{
        let{ id }=req.params;
        comments.findOne({
            include: {model: users, attributes: {exclude: ['password','createdAt','updatedAt']}},
            where: {id}
        })
        .then((data)=>{
            res.send({
                msg: "Success get comment by Id",
                status: 200,
                data
            })
        })
        .catch ((err)=>{
            res.send({
                msg: 'Error to get comment by Id',
                status:500,
                err,
            })
        })
    },
    postComment : (req, res)=>{
        let{body} = req;
        let{id} = req.decodedToken;
        comments.create({...body,user_id: id})
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
    getCommentByEventId :(req,res)=>{
        let{ id }=req.params;
        comments.findAll({
            where : {event_id: id},
        })
        .then ((data)=>{
            if(data.length == 0){
                res.status(404).send({
                    msg: 'data is deleted or moved',
                    status:404,
                })
                return
            }else{
                res.status(200).send({
                    msg: 'Success get data By Event Id',
                    status:200,
                    data
                })
                return    
            }
        })
        .catch((err)=>{
            res.status(500).send({
                msg: 'Failed get data By Event Id',
                status: 500,
                err,
            })
        })
    },
    getCommentByUserId :(req,res)=>{
        let{ id }=req.params;
        comments.findAll({
            where : {user_id: id},
        })
        .then ((data)=>{
            if(data.length == 0){
                res.status(404).send({
                    msg: 'data is deleted or moved',
                    status:404,
                })
                return
            }else{
                res.status(200).send({
                    msg: 'Success get data By User Id',
                    status:200,
                    data
                })
                return    
            }
        })
        .catch((err)=>{
            res.status(500).send({
                msg: 'Failed get data By User Id',
                status: 500,
                err,
            })
        })
    },
    deleteComment :(req, res)=>{
        let{id}=req.params;

        comments.destroy({
            where : {id},
        })
        .then((data)=>{
            if(data.length == 0){
                res.status(404).send({
                    msg: 'data already deleted or moved',
                    status: 404,
                    data
                })
                return
            }else{
                res.status(200).send({
                    msg: 'Success delete data',
                    status: 200,
                    data
                })
                return    
            }
        })
        .catch((err)=>{
            res.status(500).send({
                msg: 'Failed delete data',
                status: 500,
                err,
            })
        })
    },
    updateComment: (req, res)=>{
        let{id}=req.params;
        let{body}=req;
            comments.update(body,{
                where:{id}
            })
            .then((data)=>{
                res.status(200).send({
                    msg: 'Success update data by id',
                    status: 200,
                    data
                })
            })
            .catch((err)=>{
                res.status(500).send({
                    msg: 'Failed update data by id',
                    status: 500,
                    err,
                })
            })
    },
}