const jwt = require("jsonwebtoken");
const {users} = require("../models")

module.exports = {
    checkLogin : (req,res,next)=>{
        const bearer = req.headers.authorization
        if(!bearer){
            res.status(401).send({
                msg: "cannot access",
                status: 401,
                error: "harap isi token akses"
            })
            return
        }else{
            const token = bearer.split("Bearer ")[1]
            try{
                const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
                req.decodedToken = decodedToken; 
                next();
            }
            catch(error){
                res.status(401).send({
                    msg: "cannot access",
                    status: 401,
                    error: "Invalid token",
                })
            }
            
        }
    },
    checkToken : async(req,res)=>{
        const bearer = req.headers.authorization
        if(!bearer){
            res.status(401).send({
                msg: "cannot access",
                status: 401,
                error: "harap isi token akses"
            })
            return
        }else{
            const token = bearer.split("Bearer ")[1]
            try{
                const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
                const expire = new Date(decodedToken.exp*1000);
                const userdata = await users.findByPk(decodedToken.id)
                res.status(200).send({
                    msg: "check token success",
                    status:200,
                    data: {...userdata.dataValues,exp: expire}
                })
            }
            catch(error){
                res.status(401).send({
                    msg: "cannot access",
                    status: 401,
                    error: "Invalid token",
                })
            }
        }
    }
}