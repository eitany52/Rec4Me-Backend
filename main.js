const express = require('express');

const app = express();

app.post('/login',(req,res)=>{
   // console.log(req);
    console.log(req.params);
    console.log(res.params);
})

app.post('/register',(req,res)=>{
    console.log(req);
    console.log(res);
    
})

app.get('/',(req,res)=>{
    res.redirect('/login');
})

const port = 3000
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })