const { application } = require("express");
const express = require("express");

const app = express();// semi column is not required here 

const port =3008;

const mysql = require("./connection").con

// configuration 

app.set("view engine","hbs");
app.set("views","./view")
app.use(express.static(__dirname +"/public"))
//writing a configuration for post search request use middle ware
// app.use(express.urlencoded())
// app.use(express.json())

//Routing
/*we can use Raw html but this is not a good way so we can use javascript template engine 


*/
app.get("/",(req,res)=>{
    // res.send("hello how are you ");--> send file direct is not allowed in hbs 

    res.render("index")
    });
   
    app.get("/add",(req,res)=>{
         res.render("add")
        });

        app.get("/search",(req,res)=>{
            res.render("search")
           });

           app.get("/update",(req,res)=>{
            res.render("update")
           });
           app.get("/delete",(req,res)=>{
            res.render("delete")
           });
           app.get("/view",(req,res)=>{
            res.render("view")
           });

app.get("/addstudent",(req,res)=>{
    //fetching data from form
    // res.send(req.query);--data is stored as form of query 
    //const name =req.query.name--> name is parameter we mentioned in every params(although we use destructure method)
    const{name,phone,email,gender}=req.query


    //sanitization xss...(important cover it later->its used to prevent for hacking)

    let qry="select * from text where emailid=? or phoneno=? ";
    mysql.query(qry,[email,phone],(err,result)=>{
        if(err) throw err;
        else{
           // res.send(result); its store in form of array so we can make a condition
           if(result.length >0){
            res.render("add",{checkmesg:true})

           }
           else{
            //insert query 
            let qry2= "insert into text  value(?,?,?,?)";
             mysql.query(qry2,[name,email,phone,gender],(err,result)=>{
                //res.send(result);
                if(result.affectedRows >0){
                    res.render("add",{mesg:true})
                }
             })
           
           }
        }
    })

    

});



/*-->for the post request in search <--*/
// app.post("/searchstudent",(req,res)=>{
// /*res.send("Manage post req....");
// res.send(req.query)--> this query is not working ,
//  because its result shows the curly braces over there so we can write a configuration
// although req.body is used 
//  */
// res.send(req.body);
// })

/* for the search student get request */

app.get("/searchstudent",(req,res)=>{
    //fetch data from the form 
    
    const{phone} =req.query;

    let qry= "select * from test where phoneno=?";
    mysql.query(qry,[phone],(err,result)=>{
        if(err) throw err;
        else{
   if(result.length >0){
  res.render("search",{mesg1:true,mesg2:false})
   } else{
    res.render("search",{mesg1:false,mesg2:SVGComponentTransferFunctionElement})

   }
        }
    });
})

app.get("/updatesearch",(req,res)=>{

    const{phone} =req.query;
    let qry = "select * from test where phoneno=?";
    mysql.query(qry,[phone],(err,result)=>{
   if(err) throw err;
   else{
    if(result.length>0){
        res.render("update",{mesg1:true,mesg2:false,data:result})
    }else{
        res.render("update",{mesg1:false,mesg2:true})
    }
   }
    })

})

app.get("updatestudent",(req,res)=>{
//fetch data

const {email,name,gender} =req.query;
let qry ="update test set username =? ,gender=? where phoneno=?";

mysql.query(qry,[name,gender,phoneno],(err,results)=>{
    if(err) throw err
    else{
        if(results.affectedRows >0){
            res.render("update",{umesg:true})

        }
    }
})

});

app.get("/removestudent",(req,res)=>{
//fetch data 

const{phone} = req.query;
let qry ="delete * from test where phoneno=?";
mysql.query(qry,[phone],(err,result)=>{
    if(err) throw err
    else{
        if(result.affectedRows>0)
        res.render("delete",{mesg1:true,mesg2:false})
    }
    res.render("delete",{mesg1:false,mesg2:true})
})

});

app.get("view",(req,res)=>{
    let qry="select * from test";
    mysql.query(qry,(err,result)=>{
        if(err) throw err;
        else{
        res.render("view",{data:result})
        }
    })
})




//create server 
app.listen(port,(err)=>{
    if(err)
    throw err 
    else 
    console.log("server is running at port %d:",port);
})


