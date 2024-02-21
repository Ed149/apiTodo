require('dotenv').config()
const jwt = require('jsonwebtoken');

const getToken = (uid,name)=>{
    const payload = {uid,name};

    console.log("Get token payload",payload)
    return new Promise((resolve,reject)=>{
        jwt.sign(payload,process.env.SECRET_SEED,{
            expiresIn:'2h'
        },(err,token)=>{
            if(err){
                console.log("Error al generar el token",err);
            }
            resolve(token)
        }
        )

    })
    
}


module.exports = {getToken}