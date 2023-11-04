const express = require("express");

const app = express();

app.get("/test", (req, res)=>{
    res.send("test");
})




app.listen(4000, ()=>{
    console.log("Server is live at port 4000");
})