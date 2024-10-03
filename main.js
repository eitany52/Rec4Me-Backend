const express = require('express');
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');
const router = express.Router();
const database = require('./database');
const cors = require('cors');
const passport = require('passport');
const app = express();
require('dotenv').config();
require('./passport');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use(passport.initialize());

app.use("/",router);



app.post('/log-in', (req,res)=>{
    database.login(req.body.companyID, req.body.companyPassword).then(message =>{                  
        const payload = { companyID: req.body.companyID};
        // creating access token
        const data = {
            token: "Bearer " + jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET),
            message: message
        }
        res.status(200).send(data);
        
    }).catch(err =>{
        console.log("I was here");
        console.log(err);
        res.status(500).send(err); // 500 = Server error       
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
            res.status(500).send(err);
        });
});

// verify access token
app.get('/admin', passport.authenticate('jwt', { session: false }), (req, res) =>{
    res.status(200).send("Approved");
});


const port = 3000
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
