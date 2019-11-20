import express from 'express'
require('dotenv').config();

const app=express();

app.listen(process.env.PORT, function()
{
    console.log(`Running on ${process.env.PORT}`);
})


