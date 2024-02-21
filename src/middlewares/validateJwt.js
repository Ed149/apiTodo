require('dotenv').config();
const jwt = require('jsonwebtoken');


const validateJwt = (req,res,next) =>{

    let token = req.header('Authorization');

    if(!token){
        return res.status(401).json({
            status:"Failed",
            message:"No cuenta con token"
        })
    }

    try{
        let {uid,name} = jwt.verify(token,process.env.SECRET_SEED)

        req.uid = uid;
        req.name = name;
        
    }catch(error){
        return res.status(400).json({
            status:"Failed",
            message:"El token no es valido",
            error
        })
    }

    next();

}

module.exports={validateJwt}