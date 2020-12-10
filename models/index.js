const mongoose = require('mongoose');
mongoose.set('debug' , true);
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost:27017/bank',{
    keepAlive:true ,
    useNewUrlParser:true ,
    useUnifiedTopology:true
});

module.exports.User = require('./user');
module.exports.Transiction = require('./transiction');