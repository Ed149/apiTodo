const { validateJwt } = require("../middlewares/validateJwt");
const todoController = require("../controllers/todoController");

const express = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validation");
const app = express();
const router = express.Router();

router.use(validateJwt);


router.get('/',todoController.getTodos);

router.post('/',[
    check("todo","El todo no puede estar vacío").trim().notEmpty().isString(),
    validateFields
],
todoController.createTodo);

router.patch('/:id',todoController.updateTodo);

router.delete('/:id',todoController.deleteTodo);



module.exports = router;