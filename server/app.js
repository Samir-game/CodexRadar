const express= require("express");
const userRouter= require("./routes/user.route.js")
const app= express();



app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/user",userRouter)


module.exports= app;