const express = require('express');

const app = express();

app.post('/login',(req,res)=>{
    console.log(req);
    console.log(res);
})

app.post('/register',(req,res)=>{
    console.log(req);
    console.log(res);
    
})

app.get('/user',(req,res)=>{
    
})

app.listen(3000);