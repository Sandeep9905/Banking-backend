const mongoose = require('mongoose');
const User = require('./user');

const transictionSchema = new mongoose.Schema({
    deposit:{
        type:Number
    },
    withdraw:{
       type:Number
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true});

const Transiction = mongoose.model('Transiction',transictionSchema);

module.exports = Transiction;