//const bcryptjs = require('bcryptjs');
const {compareSync } = require('bcryptjs');
const {Pool} = require('pg');
const { database } = require('pg/lib/defaults');

const pool = new Pool({
  user: 'fs-info',
  host: '192.114.5.161',
  database: 'fs-info-db',
  password: '123',
  port: 5432,
  "max": 20, // Max 20 connection
  "connectionTimeoutMillis" : 0, // if all the connection are busy, "0" means "wait forever" (we can change it to shorter time)
  "idleTimeoutMillis": 0, // this destroy the connection if it is no use. "0" means never - but we can set any other number and it will be in seconds
})


const login = function(companyID, password){
    return new Promise(function(resolve, reject){
        if(companyID === "" || password === ""){
            reject(-1);
        }
        pool.query(`SELECT company_id, password FROM users_info WHERE company_id= 
        ${companyID}`).then(user =>{
            if(!user){ // if the user doesn't exist
                reject(-1);
            }
            //if the password is incorrect
            if(!compareSync(password, user.rows[0].password)){
                reject(-1);
            }
            else{ // if the user exists and the password is correct
                resolve(1);
            }
        }).catch(err =>{
            console.log(err);
            reject(-1);
        })
    })
}

const register = function(companyID, password, email, name, establishment, domain, occupation, location, size, amountManagers,
                         amountEmployees, amountCEO, systemUsed){
        return new Promise(function(resolve, reject){

            // This checks if these variables are numbers. IF they are not numbers -> reject!
            if(isNaN(companyID) || isNaN(size) || isNaN(amountManagers) || isNaN(amountEmployees) || isNaN(amountCEO)){
                reject(-1);
            }
            pool.query(`INSERT INTO users_info (company_id, year_establishment, organization_size, num_of_ceo, num_of_managers, num_of_employees, email, organization_domain, organization_name, occupation, location, organization_system_used, password)
                VALUES( ${companyID} , ${establishment}, ${size} , ${amountCEO} ,${amountManagers},${amountEmployees}, '${email}', '${domain}' , '${name}', '${occupation}' , '${location}' , '${systemUsed}', '${password}' )`).
                then(result => {
                    resolve(1);
                }).catch(e => {
                    console.error(e.stack)
                    reject(-1);
                }).then(() => {
                });
        });
}

const findUser = function(companyID){
    return new Promise(function(resolve, reject){
        pool.query(`SELECT company_id, password FROM users_info WHERE company_id= 
            ${companyID}`).then(user =>{
                resolve(user);
            }).catch(err =>{
                reject(err);
            });
    });
}

module.exports = {register, login, findUser};


// Login method. Gets company id and password, then connect to the database
// and checks if they exists
// const login = function(companyID, password){
//     return new Promise(function(resolve, reject){
//         if(companyID === "" || password === ""){
//             reject(-1);
//         }
//         pool.query(`SELECT company_id, password FROM users_info WHERE company_id= 
//         ${companyID} AND password= '${password}'`).then(result =>{
//             resolve(1);
//         }).catch(err =>{
//             reject(-1);
//         }).then(()=> {});
//     })
// }

// This func return a promise. IF register was succsessful, it will return 1, else - it will return -1
// const register = function(companyID, password, email, name, establishment, domain, occupation, location, size, amountManagers,
//                          amountEmployees, amountCEO, systemUsed){
//         return new Promise(function(resolve, reject){

//             // This if checks if these variables are numbers. IF they are not numbers -> reject!
//             if(isNaN(companyID) || isNaN(occupation) || isNaN(size) || isNan(amountManagers) || isNaN(amountEmployees) || isNaN(amountCEO)){
//                 reject(-1)
//             }
//             pool.query(`INSERT INTO users_info (company_id, year_establishment, organization_size, num_of_ceo, num_of_managers, num_of_employees, email, organization_domain, organization_name, occupation, location, organization_system_used, password)
//                 VALUES( ${companyID} , ${establishment}, ${size} , ${amountCEO} ,${amountManagers},${amountEmployees}, '${email}', '${domain}' , '${name}', '${occupation}' , '${location}' , '${systemUsed}', '${password}' )`).
//                 then(result => {
//                     resolve(1);
//                 }).catch(e => {
//                     console.error(e.stack)
//                     reject(-1);
//                 }).then(() => {
//                 });
//         });
// }