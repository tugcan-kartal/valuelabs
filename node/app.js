const express=require("express");
const bodyParser=require("body-parser");
const jwt=require("jsonwebtoken");

const app=express();
const port=3000;

app.use(bodyParser.json());

const authenticateJWT=(req,res,next)=>{
    const token=req.header("Authorization");
    if (!token) {
        return res.status(403).send("Token required")
    }

    try {
        const decoded=jwt.verify(token,"your_jwt_secret_key");
        req.user=decoded;
    } catch (err) {
        return res.status(401).send("Inavalid token");
    }

    return next();
};

app.get("/add",authenticateJWT,(req,res)=>{
    const {num1,num2}=req.query;

    if (!num1 || !num2) {
        return res.status(400).send("Both num1 and num2 required");
    }

    const number1=parseFloat(num1);
    const number2=parseFloat(num2);

    if (isNaN(number1) || isNaN(number2)){
        return res.status(400).send("num1 and num2 not valid")
    }

    const result=number1+number2;
    res.send({result});
});

app.listen(port,()=>{
    console.log(`Server is in http://localhost:${port}`);
});