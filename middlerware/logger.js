const logger =(req, res , next )=>{
    console.log("Hello there ----");
    next();
}



module.exports = logger;    