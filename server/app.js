const express = require("express");

const app = express();

require('dotenv').config();

const bodyParser = require("body-parser");

const mongoose = require("mongoose");

const cors = require("cors");

const  routes = require("./routes/member.route");


const port = process.env.PORT;
const url = process.env.DB_URL;
console.log(port)
app.use(cors());

app.use(bodyParser.json());

app.use(routes);

app.use((err,req,res,next)=>{
   const{code,message} = err;
   res.status(code||500).json({message});
});

const connect = async () => {
    try {
        const connection = await mongoose.connect(url,
            { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected");
    }

    catch (err) {
        console.log("some err occured");
        console.log("err:", err);
    }

};
connect();


app.listen(port,()=>{
    console.log(`Server is up on port ${port}`);
});
