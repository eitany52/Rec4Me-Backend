const express = require('express');
const bodyParser = require("body-parser");
const router = express.Router();
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/",router);

router.post('/login',(req,res)=>{
    console.log(req.body);
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