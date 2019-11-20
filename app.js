import express from 'express'
require('dotenv').config();

import { indexController } from './routes/index'

const app=express();


app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use('/index', indexController);

app.listen(process.env.PORT, function()
{
    console.log(`Running on ${process.env.PORT}`);
})
