const express = require("express");
const mysql =  require("mysql");

const Route =  express.Router();
const IndexContoller = require("../controler/control");
const { verifyToken  , loggier } = require("../middlerware/jwtauth");

Route.get('/blog' , verifyToken , IndexContoller.getblog);
Route.get('/blog/:id',verifyToken ,IndexContoller.getblogbyid);
Route.post('/blog',verifyToken,IndexContoller.postblog);
Route.put('/blog/:id' ,verifyToken, IndexContoller.updateblogbyid);
Route.delete('/blog/:id', verifyToken,IndexContoller.deleteblogbyid);
Route.post('/user/register' , IndexContoller.userRegistration);   
Route.post('/user/login' , IndexContoller.userLogin);


module.exports = Route;
