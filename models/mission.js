const mongoose = require('mongoose');

const MissionSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
        
    },
    coords:{
      type:String,
      required:true
    }
});


module.exports=mongoose.model('Mission',MissionSchema);
