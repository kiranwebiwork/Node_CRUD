const member = require("./member")
const connection = require("../db/db");
const bcrypt = require('bcrypt');
const saltRounds = 10;
// const nodemailer =  require("nodemailer");
var jwt = require('jsonwebtoken');
const { json } = require("body-parser");
const { verifyToken } = require("../middlerware/jwtauth");


class IndexContoller {
    //  take all post blog data  
    static getblog( req, res ) { 
        console.log("req.data" , req.datas)
        console.log("req.data" , req.data)
            // res.status(500).send("Faild Authontication")
           connection.query("SELECT * FROM BlogPostAdd", function (err, result, fields) {
             if (err) throw err;
             res.status(200).send(result) 
         });
}
    // Get single blog data 

    static getblogbyid(req, res) {
        console.log("req,bpdy" , req.body)
        connection.query("SELECT * FROM BlogPostAdd", function (err, result, fields) {
            if (err) throw err;
            // console.log(result);
            const found = result.some(single => Number(single.id) === parseInt(req.params.id))
            // console.log("found", found);
            if (found) {
                res.json(result.find(single => Number(single.id) === parseInt(req.params.id)))
            } else {
                res.status(400).json("Wrong id you pushed")
            }
            // connection.end();
        });
    }

  
    // Create a new blog 
    // Create a new blog 
    static postblog(req, res) {
        console.log("req.body :-" , req.body)
        const description = req.body.description;
        console.log("description", description);
        var sql = `INSERT INTO BlogPostAdd ( description) VALUES (  "${description}") `
        connection.query(sql, function (err) {
            if (err) throw err;
            res.status(201).send({massage:"Post create"});
        });
    }


   // Update a blog with specific id 

        static updateblogbyid(req, res) {
            connection.query("SELECT * FROM BlogPostAdd", function (err, result, fields) {
                if (err) throw err;
                console.log(result);
                const found = result.some(single => Number(single.id) === parseInt(req.params.id))
                console.log("found", found);
                if (found) {
                    const updateblog = req.body;
                    console.log(updateblog);
                    // res.json(member.find(single=>Number(single.id) === parseInt(req.params.id)))
                    console.log("id: ", req.params.id)
                    result.forEach((singlblogup) => {
                        if (Number(singlblogup.id) === parseInt(req.params.id)) {
                            console.log(singlblogup.description);
                            singlblogup.description = updateblog.description ? updateblog.description : singlblogup.description;

                            // var sql = `INSERT INTO BlogPostAdd (id , description) VALUES (" ${req.params.id}", "${singlblogup.description}") `
                        //   var sql = "UPDATE BlogPostAdd SET address = 'Canyon 123' WHERE address = 'Valley 345'";  

                            var sql = `UPDATE BlogPostAdd SET   description= "${singlblogup.description}" WHERE id = "${req.params.id}"`
                            connection.query(sql, function (err, result) {
                                    if (err) throw err;
                                    console.log("1 record Updated");
                                });
                           res.send({ msg: "Data is Updated:", result });
                        }
                    });
                } else {
                    res.status(400).json("Wrong id you pushed")
                }
            });
    }


    //Delete a blog by single Id

    static deleteblogbyid(req, res) {
        connection.query("SELECT * FROM BlogPostAdd", function (err, result, fields) {
            if (err) throw err;
            const found = result.some(single => Number(single.id) === parseInt(req.params.id));
            if (found) {
              var sql= `DELETE FROM BlogPostAdd WHERE id = "${req.params.id}"`;
                connection.query(sql, function (err, result) {
                    if (err) throw err;
                    res.json(`Blog Nummber "${req.params.id}"   Deleted`) 
                });
            }else{
                        res.status(400).json("Wrong id you pushed")
             }
            // connection.end();
        });
    }
    // Delete a all  blog  list

    static deleteallblog(req, res) {
        console.log(req.body);
        res.json(req.body);
        if (req.body) {
            res.json("All post are deleted")   
        }
    }
    // User Registration

    static  userRegistration(req, res){
    console.log("req.body:",req.body)
    const id = req.body.id ; 
    const name = req.body.Name ; 
    const email = req.body.Email ;
    const password = req.body.Password;
   
   const securePassword = async (password)=>{
      const hashpassword = await bcrypt.hash(password , 10) 
      const checkuserisexit = 'SELECT  Email FROM Registration WHERE Email= "' + email +'"';                                                         
      connection.query(checkuserisexit , function (err, result) {
         if (result.length == 0) {
             var sql = `INSERT INTO Registration (id, Name, Email ,  Password) VALUES ( "${id}" , "${name}" , "${email}" , "${hashpassword}")`;
             connection.query(sql, function (err, result) {
                if (err) throw err;
                console.log("1 record inserted");
                res.send("Successfull Register");
              });   
         }else
         {
             res.send("User Email Already Exits")
             res.status(400)
         }         
      }) 
   }
   securePassword(password);
 }

//  User login
 static userLogin(req, res){
console.log("req.body:",req.body)
const email = req.body.Email ;
const password = req.body.Password; 
const checkuserisexit = 'SELECT  * FROM Registration WHERE Email= ? ';                                                         
connection.query(checkuserisexit , [email],function (err, result) {
   console.log("result:1" , result)
    if (result.length > 0) {
        bcrypt.compare(password ,result[0].Password ,(err , response)=>{
            if ( response) {
                var token = jwt.sign({email} , "Webi" , {expiresIn: '1m'} );
                res.status(200).send( {massage:"success full loged in" , response , token})    
            }else{
                res.status(401).send( {massage:"wrong password " , response })     
            }
        })
    }else
    {     
       res.status(402).send({massage :" Enter the valid Email  --" }); 
    }         
 })
}
}
module.exports = IndexContoller;











    // console.log(`${req.body.Name} ${req.body.Email}  ${req.body.Password}`);
        // const password = req.body.password;    
        // const encryptedPassword =  bcrypt.hash(password, saltRounds)
        // console.log("encryptedPassword" , encryptedPassword);
            // static userLogin(){
    //     req.json("User Login:");
    //     console.log( "login " ,req.body);
    // }

    // jwt.sign({ email:email} , 'secreatekey' , (err, token)=>{
//     res.json({
//         token
//     })
// })
    // const authHeader =  req.headers['authorization']
        // const bearerToken = authHeader.split(' ');
        // const token = bearerToken[1];
        // console.log("token:" , token)
        // if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
        //  jwt.verify(token, "Webi", function(err, decoded) {
        //    if (err) return res.status(500).send({ auth: false, message: ' ---Failed to authenticate token.' });   
        //  });
    //    const token = req.headers.authorization; 
    //    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    //     jwt.verify(token, "Webi", function(err, decoded) {
    //       if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });   
    //       res.status(200).send(decoded)
    //       connection.query("SELECT * FROM BlogPostAdd", function (err, result, fields) {
    //         if (err) throw err;
    //         console.log(result);
    //         res.json(result)
    //     });
    // });