const express = require("express");
const cors = require("cors");



const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));



app.get("/test", (req, res)=>{
    res.json("test");
});

app.post('/register', (req, res) => {
    const {name, email, password} = req.body;
    res.json({name, email, password});
});



app.listen(4000, ()=>{
    console.log("Server is live at port 4000");
})