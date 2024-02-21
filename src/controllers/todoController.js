const todoService = require('../services/todoService');

const getTodos = async (req, res) => {


    console.log("Request", req);
    const { uid } = req;
    try {
        let todos = await todoService.getTodos(uid);

        res.status(200).json(todos);
    } catch (err) {
        res.status(err?.status || 500).json({
            status: "Failed",
            message: err?.message || err
        });
    }

}

const createTodo = async (req, res) => {
    const { uid, body } = req;
    body.idUser = uid;
    try {
        let todo = await todoService.createTodo(body);

        res.status(200).json(todo);
    } catch (err) {
        res.status(err?.status || 500).json({
            status: "Failed",
            message: err?.message || err
        });
    }
}

const updateTodo = async (req, res) => {

    let { id } = req.params;
    let { body } = req;
    let ids = {id,iduser: req.uid}

    try {
        console.log("Se lelgó al controller")
        let updatedTodo = await todoService.updateTodo(ids, body);

        res.status(200).json(updatedTodo)

    } catch (err) {
        res.status(err?.status || 500).json({
            status: "Failed",
            error: err?.message || err
        })
    }

}

const deleteTodo = async(req,res)=>{

    let {id} = req.params;
    let {uid} = req;
    try{

        let deletedTodo = await todoService.deleteTodo(id,uid);

        res.status(200).json(deletedTodo)
    }catch(err){
        res.status(err?.status || 500).json({
            status:"Failed",
            message:err?.message || err
        })
    }
}


module.exports = {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo
}