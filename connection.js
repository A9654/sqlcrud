const mysql= require("mysql2");

const con=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"A@9654_run",
    database:"project",
    port:3008

});

con.connect((err)=>{
  if(err){
    console.log(err);
  }
console.log("created server")
});

module.exports.con=con;