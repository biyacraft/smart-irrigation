const mongoose= require('mongoose');
const machinelearningSchema= mongoose.Schema({
    model_id:{
        type:String,
        require:true
       
    },
    name:{
       
        type:String,
        require:true
    },
    type:{
        type:String,
        require:true
    },
   location:{
        type:String,
        require:true

    },
   model_detail:{
        type:String,
      default:""
    },
    training_time:{
        type:Date,
      default:Date.now

    }

    

});
exports.Machinelearning = mongoose.model('Machinelearning',machinelearningSchema);