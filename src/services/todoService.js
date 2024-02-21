const {getSelectQuery,generateInsertQuery, dbQuery,getUpdateQuery,getDeleteQuery} = require('../db/config')

const getTodos = async(uid) =>{
    try{        
        const result = await getSelectQuery("todos","idUser",uid);
        return {
            status:"Ok",
            todos:result
        }

    }catch(error){
        throw error;
    }

}

const createTodo = async(todo)=>{

    try{
        let todoQuery = generateInsertQuery("todos",todo);
        let result = await dbQuery(todoQuery);
        return {
            status:"Ok",
            message:"El todo fue registrado exitosamente",
            result
        }

    }catch(err){
        throw err;
    }
}

const updateTodo = async(ids,todo)=>{
    try{
        let findTodo = await getSelectQuery("todos","idTodo",ids.id);
        if(findTodo.length <= 0){
            throw {
                status:400,
                message:`El todo con el id ${ids.id} no existe`
            }
        };

        if(ids.iduser != findTodo[0].iduser){
            throw{
                status:400,
                message:"El usuario no tiene permisos para editar el todo"
            }
        };
        
        let updateQuery = await getUpdateQuery("todos",todo,ids.id);

        let {rows} = await dbQuery(updateQuery);


        return {
            status:"Ok",
            message:"Actualizado correctamente",
            rows
        }

    }catch(err){
        throw err;
    }
}

const deleteTodo = async(id,uid) => {
    try{
        let findTodo = await getSelectQuery("todos","idTodo",id);
        console.log("FindTodo",findTodo)
        if(findTodo.length <= 0){
            throw {
                status:400,
                message:`El todo con el id ${id} no existe`
            }
        };

        if(uid != findTodo[0].iduser){

            throw{
                status:400,
                message:"El usuario no tiene permisos para editar el todo"
            }
        };
        
        let objId = {idtodo:id}
        
        let deleteQuery = getDeleteQuery("todos",objId);

        console.log("delete query",deleteQuery);
        
        await dbQuery(deleteQuery);

        return {
            status:"Ok",
            message:"El todo ha sido eliminado"
        }
    
    }catch(error){
        throw error;
    }
}

module.exports = {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo
}