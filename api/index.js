const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const User = require("./models/User.js");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

require('dotenv').config();


const app = express();
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = process.env.JWT_SECRET;

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(cookieParser());


mongoose.connect(process.env.MONGO_URL)

app.get("/test", (req, res) => {
    res.json("test");
});


app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {

        const user = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt)
        });
        res.json(user);
    }
    catch (err) {
        res.status(422).json(err);
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        const checkPassword = bcrypt.compareSync(password, user.password);
        if (checkPassword) {
            jwt.sign(
                {
                    email: user.email,
                    id: user._id
                },
                jwtSecret,
                {},
                (err, token) => {
                    if(err)
                        throw err;
                    res.cookie('token', token).json(user);
                }
            )
        }
        else{
            res.status(422).json('wrong password');
        }
    }
    else {
        res.json('login failed');
    }
});


app.get('/profile', (req, res) =>{
    const {token} = req.cookies;
    if(token){
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if(err) throw err;
            const {name, email, _id} = await User.findById(userData.id);
            res.json({name, email, _id});
        });
    }
    else{
        res.json("token not found");
    }
})



app.listen(4000, () => {
    console.log("Server is live at port 4000");
})