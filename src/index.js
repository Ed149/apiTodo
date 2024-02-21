require('dotenv').config();

const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');

app.use(bodyParser.json());
app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/todos',todoRoutes);

app.listen(process.env.PORT,()=>{
    console.log("Escuchando en puerto",process.env.PORT )
})
