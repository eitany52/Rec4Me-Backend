const express = require('express');
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');
const router = express.Router();
const database = require('./database');
const csv = require('csv-parser');
const fs = require('fs');
const app = express();
require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

app.use("/",router);


router.post('/log-in', (req,res)=>{
    database.login(req.body.companyID, req.body.companyPassword).then(data =>{
        console.log(data);
        //res.redirect('admin_panel.html');
        //res.json({accessToken: accessToken});
        
        const user = { companyID: req.body.companyID};
        // creating access token with the user details
        const accessToken = {token: jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)} ;
        res.render('/adminpanel',accessToken);
        
    }).catch(err =>{
        res.send()
        console.log(err);
    });
});

app.post('/sign-up', (req,res)=>{
    const data = req.body;
    database.register(data.companyID, data.companyPassword,data.email,
        data.compName,data.establishment,data.domain,data.occupation,
        data.location, data.size, data.numOfManagers, data.numOfEmployees,
        data.numOfCeo, data.systemUsed).then((data) =>{
            res.sendStatus(200);
        }).catch(err => {
            console.log(err);
            res.status(400).send(err);
        });
});

app.post('/adminpanel',authenticateToken,(req,res)=>{

});


// middleware function that check if the token is valid
function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null) return res.sendStatus(401); // 401 - means, user did not send token to the server

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(err, user)=> {
        if(err) return res.sendStatus(403) // 403 - means token is no longer valid - so user have no access
        req.user = user;
        next;
    })
}

const port = 3000
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});