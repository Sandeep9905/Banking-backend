const db = require('../models');
const jwt = require('jsonwebtoken');

exports.signin = async function(req , res , next){
    try{
      let user = await db.User.findOne({ email: req.body.email });
      let {id , username ,profileImageUrl ,banker ,account_number ,account_balance ,account_type ,address , Mob_no ,transiction_info} = user;
      let isMatch = await user.comparePassword(req.body.password);
      if(isMatch){
        let token = jwt.sign({
            id , username , profileImageUrl ,banker ,account_number ,account_balance ,account_type ,address , Mob_no,transiction_info
        },process.env.SECRET_KEY);
        
        return res.status(200).json({
            id , username ,profileImageUrl , token ,banker ,account_number ,account_balance ,account_type ,address , Mob_no ,transiction_info
        });

      }else{
        return next({
            status:400 ,
            message:"Invalid Email/Password ."
        });
      }
    }catch(err){
       return next({
           status:400 ,
           message:"Invalid Email/Password ."
       });
    }
}


exports.signup = async function(req ,res ,next){
    try{
      let user = await db.User.create(req.body);
      console.log(user)
      let {id , username ,profileImageUrl ,banker ,account_number ,account_balance ,account_type ,address , Mob_no} = user;
      let token = jwt.sign({
          id , username , profileImageUrl,banker ,account_number ,account_balance ,account_type ,address , Mob_no
      } , process.env.SECRET_KEY);
      
      return res.status(200).json({
          id , username , profileImageUrl ,token ,banker ,account_number ,account_balance ,account_type ,address , Mob_no
      });

    }catch(err){
        if(err.status === 11000){
            err.message = "Sorry that username and/or email is taken";
        }
        return next({
            status:400 ,
            message: err.message
        })
    }
}