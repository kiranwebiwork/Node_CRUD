const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader =  req.headers['authorization']
  const bearerToken = authHeader.split(' ');
  const token = bearerToken[1];
  console.log("token:" , token)
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
   jwt.verify(token, "Webi", function(err, decoded) {
  
     if (err) {
      console.log("verficationtoken if")
     res.status(500).send({ message: 'Failed to authenticate token.' });   
     }else{
       console.log("verficationtoken else")
        req.data=decoded
        next();
     }
});
};

const loggier =(req,res ,next)=>{
  console.log("login middleware:" , req)
  console.log("Login Middle ware") 
  next();
}

module.exports = {
  verifyToken ,
   loggier
};