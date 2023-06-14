const { bookevent } = require("../models/");


module.exports={
    ikuti: (req,res)=>{
        let {id} = req.decodedToken
        let {event_id} = req.body
        if(event_id == null){
            res.status(404).send({
                msg: 'data id_event harus ada',
                status: 404
            });
            return
        }
        bookevent.create({...req.body,user_id: id})
        .then((data)=>{
            res.status(200).send({
                msg: 'Success ikut event',
                status: 200,
                data : data
            })
        })
        .catch((err)=>{
            res.status(500).send({
                msg: 'Failed ikuti event',
                status: 500,
                err,
            })
        })

    },
    list_event: async(req,res)=>{
        let {id} = req.decodedToken
        bookevent.findAll({
            where: {user_id: id},
            include: {all: true, attributes: {exclude: ['password','createdAt','updatedAt']}}
        })
        .then((data)=>{
            res.send({
                msg: "Success get all ikut event",
                status: 200,
                data
            })
        })
        .catch ((err)=>{
            res.send({
                msg: 'Error to get all ikut event',
                status:500,
                err,
            })
        })

    },
    delet_event: async(req,res)=>{
        const {id} = req.params

        bookevent.destroy({
            where: {id}
        })
        .then((data)=>{
            res.status(200).send({
                msg: 'Success delete ikut event',
                status: 200,
                data
            })
        })
        .catch((err)=>{
            res.status(500).send({
                msg: 'Failed delete ikut event',
                status: 500,
                err,
            })
        })

    }
}