const express = require('express');
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');
const router = express.Router();
const database = require('./database');
const app = express();
require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

app.use("/",router);


router.post('/login', (req,res)=>{
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

app.post('/register', (req,res)=>{
    database.register(req.body.companyID,req.body.companyPassword,req.body.email,
        req.body.compName,req.body.establishment,req.body.domain,
        req.body.occupation, req.body.location, req.body.size, req.body.numOfManagers, req.body.numOfEmployees,
        req.body.numOfCeo, req.body.systemUsed).then((data) =>{
            console.log(data);
            res.send(1);
        }).catch(err => {
            console.log(err);
            res.send(-1);
        });
});

app.get('/adminpanel',authenticateToken,(req,res)=>{

});

app.get('/home',(req,res)=>{
    res.redirect('/home');
})

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