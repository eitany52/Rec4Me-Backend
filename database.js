const { Client } = require('pg');
const bcryptjs = require('bcryptjs');
//const { password } = require('pg/lib/defaults');

const client = new Client({
  user: 'fs-info',
  host: '192.114.5.161',
  database: 'fs-info-db',
  password: '123',
  port: 5432,
})
client.connect();


// Login method. Gets company id and password, then connect to the database
// and checks if they exists
const login = function(companyID, password){
    client.query("SELECT company_id, password FROM users_info WHERE company_id="
            + companyID + "AND password=" + password,[1],(err,res)=>{
                if(!err){
                    console.log(res.rows);
                }else{
                    console.log(err);
                }
            client.end();
        });
}


const register = function(companyID, password, email, name, establishment, domain, occupation, location, size, amountManagers,
                         amountEmployees, amountCEO, systemUsed){
        client.query(`INSERT INTO users_info (company_id, year_establishment, organization_size, num_of_ceo, num_of_managers, num_of_employees, email, organization_domain, organization_name, occupation, location, organization_system_used, password) VALUES( ${companyID} , ${establishment}, ${size} , ${amountCEO} ,${amountManagers},${amountEmployees}, '${email}', '${domain}' , '${name}', '${occupation}' , '${location}' , '${systemUsed}', '${password}' )` ,(err,res)=>{
                        if(!err){
                            console.log(res.rows);
                        }else{
                            console.log(err);
                        }
               // client.end();
            });
}

module.exports = {register, login};