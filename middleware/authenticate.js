const jwt = require("jsonwebtoken");
const USER = require("../models/userSchema");
const keysecret = process.env.keysecret


const authenticate = async(req, res, next) => {
    try {
        const token = req.cookies.Amazonweb;
        if (!token) {
          return res.status(401).json({ error: "Unauthorized: No token provided" });
        }

        const verifyToken = jwt.verify(token, keysecret);
        console.log(verifyToken);

        const rootUser = await USER.findOne({_id:verifyToken._id,"tokens.token":token});
        console.log(rootUser);

        if (!rootUser) {
          throw new Error("User Not Found");
        }

        req.token = token; 
        req.rootUser = rootUser;   
        req.userID = rootUser._id;   
    
        next();  
    } catch (error) {
        console.log(error);
        return res.status(401).json({ error: "Unauthorized: No token provided" });
    }
};

module.exports = authenticate;