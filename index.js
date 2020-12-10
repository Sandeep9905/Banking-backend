require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./models')
const errorHandler = require('./handlers/error');
const authRoutes = require('./routes/auth');
const transictionRoutes = require('./routes/transiction');
const {loginRequired , ensureCorrectUser} = require('./middleware/auth');
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth",authRoutes);
app.use("/api/user/:id/transiction",
loginRequired,
ensureCorrectUser
,transictionRoutes);

app.get("/api/allTransiction" ,loginRequired ,async function(req ,res ,next){
    try{  
       let transiction = await db.Transiction.find()
                                       .sort({createdAt:"desc"})
                                       .populate("user",{username:true , profileImageUrl:true});                  
      return res.status(200).json(transiction);
    }catch(err){
        return next(err);
    }
});

app.use(function(req ,res , next){
    const err = new Error("Something went Wrong!");
    err.status = 400;
    next(err);
})

app.use(errorHandler);

app.listen(PORT , function(){
    console.log(`Server is starting on port ${PORT}`)
});