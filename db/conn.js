const mongoose = require("mongoose");
const DB= "mongodb+srv://antarah:37150411@cluster0.4eaflc1.mongodb.net/Amazonweb?retryWrites=true&w=majority";
//console.log(DB)

mongoose.connect(DB,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>console.log("connection is successfully done")).catch((error)=>console.log("error hai" + error.message))
