const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const User = require("./models/User.js");

require('dotenv').config();


const app = express();
const bcryptSalt = bcrypt.genSaltSync(10); 


app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));


mongoose.connect(process.env.MONGO_URL)

app.get("/test", (req, res)=>{
    res.json("test");
});


app.post('/register', async (req, res) => {
    const {name, email, password} = req.body;
    const user = await User.create({
        name,
        email,
        password:bcrypt.hashSync(password, bcryptSalt)
    });
    res.json(user);
}); 



app.listen(4000, ()=>{
    console.log("Server is live at port 4000");
})