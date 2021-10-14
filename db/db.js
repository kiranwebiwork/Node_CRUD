const mysql = require('mysql');
var connection
  function handleDisconnect() {
    connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : 'Root@1234',
      database : 'Registration'
      // host:"remotemysql.com" ,
      // user:"JfkQGJizXL",
      // password:"cWYOXeK9Ml",
      // database:"JfkQGJizXL",
    });
  connection.connect(function(err) {    
        
    if(err) {                                    
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); 
    }else{
      console.log("DB Connected---12");     
    }                                     
  });   

  connection.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
      handleDisconnect();                         
    } else {                                      
      throw err;                                  
    }
  });
  }
  
  handleDisconnect();

module.exports = connection;

