require('dotenv').config()
const {Pool} = require('pg')

const dbConfig = {
    user:process.env.DB_USER,
    host:process.env.DB_HOST,
    database:process.env.DB_NAME,
    password:process.env.DB_PASS,
    port:process.env.DB_PORT,
}
const pool = new Pool(dbConfig);

const dbQuery = async(query)=>{
    try{
        const client = await pool.connect();
        let result = await pool.query(query);
        
        // console.log("Result",result);

        client.release()
        return result;
    
    }catch(err){
        console.error("No se pudo realizar la consulta",err)
    }
}

const generateInsertQuery = (table, obj) => {
    let keyFields = Object.keys(obj);
    let values = Object.values(obj);
    let arrayValues = [];

    for (let i = 1; i <= keyFields.length; i++) {
        arrayValues.push(`$${i}`);
    }
    let text = `INSERT INTO ${table}(${keyFields.join(',')}) values(${arrayValues.join(',')}) RETURNING *`;
    return { text, values }

}

const getSelectQuery = async (table,field,value) => {

    let text = `SELECT * FROM ${table} WHERE ${field} = $1`;
    let values = [`${value}`];
    try {
        let query = { text, values };
        let user = await dbQuery(query);
        return user.rows;
    } catch (error) {
        console.error("Error al encontrar usuario", error)
    }
}

const getUpdateQuery = async(table,obj,id)=>{
    let query = [`UPDATE ${table} SET `];

    let set = [];

    Object.keys(obj).forEach((value,i)=>{
        console.log("Obj",value);
        set.push(`${value} = $${i + 1}`)
    });

    query.push(set.join(',') + ` WHERE idtodo = ${id} RETURNING *`);

    return {text:query.join(''),values:Object.values(obj)};
}

const getDeleteQuery = (table,objId)=>{
    let keys = Object.keys(objId);
    let values = Object.values(objId);
    console.log("Objeto");

    let text = `DELETE FROM ${table} WHERE ${keys} = $1`;
    
    return {text,values};

}


module.exports = {
    dbQuery,
    generateInsertQuery,
    getSelectQuery,
    getUpdateQuery,
    getDeleteQuery
}