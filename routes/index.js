import express from 'express';
import { signIntoWebsite } from '../function/scrapper'


const indexController=express.Router();

indexController.post('/data', function(request, response){
    const { email, password }=request.body;
    signIntoWebsite(email, password)
})

export{
    indexController
}