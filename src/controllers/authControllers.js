const {users, Sequelize, events} = require('../models');
const bcrypt = require ('bcrypt');
const jwt = require('jsonwebtoken');
const op = Sequelize.Op;

module.exports={
    register: (req,res) =>{
        const {body} = req;
        const defaultImage = "https://res.cloudinary.com/dkxt6mlnh/raw/upload/v1669179762/faisol/faisol-2022-11-23T05:02:41.687Z.png";
        let newData;
        if(body.name.length == 0 || body.email.length == 0 || body.password.length == 0){
            res.status(404).send({
                msg: "register gagal",
                status: 404,
                error: "data not found / kurang lengkap",
            })
            return
        }
        if(req.image_profile != undefined){
            newData = {
            ...body,
            image_profile: req.image_profile.url,
        };
        }else{
            newData = {...body, image: defaultImage};
        }
        console.log(newData)
        const saltRounds = 10;
        newData.password = bcrypt.hashSync(newData.password, saltRounds);
        users.create({...newData,address: "default",phone: "default"})
        .then((data) =>{
            res.status(200).send({
                msg: "register member sukses",
                status: "200",
                data: {
                    id: data.id,
                    name: data.name,
                    email: data.email,
                    image_profile: data.image_profile,
                    phone: data.phone,
                    address: data.address,
                    updatedAt: data.updatedAt,
                    createdAt: data.createdAt
                }
            })
        })
        .catch((error) =>{
            res.status(500).send({
                msg: "register member failed",
                status: "500",
                error,
            })
        })
    },
    login: async(req, res) =>{
        const {email,password}= req.body;
        if(email.length == 0 || password.length == 0){
            res.status(404).send({
                msg: "login gagal",
                status: 404,
                error: "data not found / kurang lengkap",
            })
            return
        }
        let findUser = await users.findOne({
            where : {
                [op.or] : [
                    {email : email},
                ]},
        })
        if(findUser === null){
            res.status(404).send({
                msg: "login gagal",
                status: 404,
                error: "user not found",
            })
            return
        }
        const invalidPassword = bcrypt.compareSync(
            password,
            findUser.dataValues.password
        );

        if(!invalidPassword) {
            res.status(401).send({
                msg: "login gagal",
                status: 401,
                error: "password salah",
            })
            return
        }
        const payload = {
            id : findUser.dataValues.id,
            name : findUser.dataValues.name,
            email : findUser.dataValues.email,
            image_profile: findUser.dataValues.image_profile,
            phone: findUser.dataValues.phone,
            address: findUser.dataValues.address
        }
        const token = jwt.sign(payload, process.env.SECRET_KEY);
        delete findUser.dataValues.password;
        res.status(200).send({
            msg: "login sukses",
            status: 200,
            data: {...findUser.dataValues, token},
        })
    },
    update_profile: (req, res)=>{
        let{id}=req.decodedToken;
        let{body}=req;
        let newData;
        if(req.image_profile != undefined){
            newData = {
            ...body,
            image_profile: req.image_profile.url,
        };
        }else{
            newData = {...body};
        }
            users.update(newData,{
                where:{id}
            })
            .then((data)=>{
                res.status(200).send({
                    msg: 'Success update data user',
                    status: 200,
                    data
                })
            })
            .catch((err)=>{
                res.status(500).send({
                    msg: 'Failed update data user',
                    status: 500,
                    err,
                })
            })
    },
}