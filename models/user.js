const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email:{
        type:String , 
        required:true ,
        unique:true
    } ,
    username:{
        type:String , 
        required:true ,
        unique:true
    },
    password:{
        type:String ,
        required:true
    },
    profileImageUrl:{
        type:String 
    },
    banker:{
        type:Boolean,
        required:true,
        default:false
    },
    account_number:{
        type:Number,
        required:true,
        default:0
    },
    account_balance:{
         type:Number ,
         required:true,
         default:0.00
     },
     account_type:{
         type:String,
         default:'saving'
     },
    transiction_info:[
    {
        type:mongoose.Schema.Types.ObjectId ,
        ref:"Transiction"
    }],
    address:{
        type:String ,
        required:true
    },
    Mob_no:{
        type:Number ,
        required:true
    }

});


userSchema.pre('save', async function(next){
    try{
        if(!this.isModified("password")){
            return next();
        } 
     let hashedPassword = await bcrypt.hash(this.password , 10);
     this.password = hashedPassword;
     let accountNum = Math.floor(Math.random()*202022000029292);
     this.account_number = accountNum;
    }
    catch(err){
       return next(err);
    }
});

userSchema.methods.comparePassword = async function(candidatePassword , next){
     try{
       let isMatch = await bcrypt.compare(candidatePassword , this.password);
       return isMatch;
     }
     catch(err){
      return next(err);
     }
}

const User = mongoose.model('User',userSchema);

module.exports = User;
