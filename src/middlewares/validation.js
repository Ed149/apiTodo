const { validationResult } = require("express-validator");

const validateFields = (req,res,next)=>{

    let validationRes = validationResult(req);
    if(!validationRes.isEmpty()){
        res.status(400).json({
            status:"Failed",
            errors:validationRes.mapped()
        })
    }

    next();
}

module.exports = {
    validateFields
}