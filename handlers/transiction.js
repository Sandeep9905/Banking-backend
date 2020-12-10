const db = require('../models');

exports.createTransiction = async function(req , res , next){
    try{ 
        if(req.body.deposit){
               let transiction =await db.Transiction.create({
                  deposit: req.body.deposit,
                  user: req.params.id
          });
          let foundUser = await db.User.findById(req.params.id);
          foundUser.transiction_info.push(transiction._id);
          foundUser.account_balance = foundUser.account_balance + req.body.deposit; 
          await foundUser.save();
          let foundTransiction = await db.Transiction.findById(transiction._id).populate("user",{
            username:true , 
            profileImageUrl:true ,
            account_number:true
        });
         return res.status(200).json(foundTransiction);
        }
        else
        { 
               let transiction = await db.Transiction.create({
                withdraw:req.body.withdraw, 
                user:req.params.id
          });
          let foundUser = await db.User.findById(req.params.id);
          foundUser.transiction_info.push(transiction._id);
          foundUser.account_balance = foundUser.account_balance - req.body.withdraw;
          await foundUser.save();
          let foundTransiction = await db.Transiction.findById(transiction.id).populate("user",{
            username:true , 
            profileImageUrl:true ,
            account_number:true
        });
         return res.status(200).json(foundTransiction);
        }
    }catch(err){
       return next(err);
    }
}

exports.getTransicition =async function(req , res , next){
    try{
     let transictions = await db.User.findById(req.params.id).populate("transiction_info",{
      withdraw:true , 
      deposit:true 
  });
     return res.status(200).json(transictions);
    }catch(err){
       return next(err)
    }
}