const { dbQuery,generateInsertQuery, getSelectQuery} = require("../db/config")
const { getToken } = require("../utils/jwt");

const bcrypt = require('bcryptjs');

const login = async (user) => {

    console.log("User en login", user);
    const { email, password } = user;
    try {

        let user = await getSelectQuery("users","email",email);
        if (user.length <= 0) {
            throw {
                status: 400,
                message: "El usuario no se encuentra registrado"
            };
        };

        let validatePassword = bcrypt.compareSync(password,user[0].pass);

        if (!validatePassword) {
            throw {
                status: 400,
                message: "La contraseña es incorrecta"
            };
        }

        if (!user[0].isactive) {
            throw {
                status: 403,
                message: "El usuario está inactivo"
            }
        }

        console.log("User",user);
        const token = await getToken(user[0].uid, user[0].username);
        return {
            status: "Ok",
            message: "Bienvenido",
            user: {
                uid: user[0].uid,
                name: user[0].username,
                lastName: user[0].userlastname,
            },
            token
        }

    } catch (err) {
        throw err;
    }
}

const register = async (user) => {
    let createdAt = new Date().toLocaleDateString();
    user.createdAt = createdAt;

    let { email,pass } = user;

    try {
        let validateUser = await getSelectQuery("users","email",email);

        if (validateUser.length > 0) {
            throw {
                status: 400,
                message: "El usuario ya se encuentra registrado"
            };
        }

        let salt = bcrypt.genSaltSync(10);
        let hashPassword = bcrypt.hashSync(pass,salt);

        user.pass = hashPassword;

        const query = generateInsertQuery("users", user)

        let {rows} = await dbQuery(query);
        
        console.log("resultado de registrar", rows);

        let token = await getToken(rows[0].uid,rows[0].username);

        return {
            message: "Registrado correctamente",
            user:{
                name: rows[0].username,
                lastname: rows[0].userlastname,
                email: rows[0].email,
            },
            token
        }

    } catch (err) {
        throw err;
    }
}

module.exports = {
    login,
    register
}