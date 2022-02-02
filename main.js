const express = require('express');
const bodyParser = require("body-parser");
const router = express.Router();
const database = require('./database');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/",router);


router.post('/login',(req,res)=>{
    console.log(req.body);
    const id = req.body.companyID;
    const pass = req.body.companyPassword;
    console.log(id);
    database.login();
})

app.post('/register', (req,res)=>{
    console.log(req.body);
    database.register(req.body.companyID,req.body.companyPassword,req.body.companyEmail,
        req.body.organizationName,req.body.dateOfEstablishment,req.body.organizationDomain,
        req.body.companyOccupation, req.body.companyLocation, req.body.organizationSize, req.body.companyAmountOfManagers, req.body.companyAmountOfEmployees,
        req.body.companyNumOfCeo, req.body.organizationSystemUsed);
    
})

app.get('/',(req,res)=>{
    res.redirect('/login');
})

app.get('/home',(req,res)=>{
    res.redirect('/home');
})

const port = 3000
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})