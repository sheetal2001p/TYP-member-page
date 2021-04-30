const mongoose  = require("mongoose");

const Schema = mongoose.Schema;

const memberSchema = new Schema({
    name:{
      type:String      
    },
    position:{
     type:String
    },
    image:{
     type:String
    },
    link:{
      type:String
    },
    isActive:{
      type:Boolean,
      default:true
    },
    memberPriority:{
        type:Number
    }

},{timestamps:true});

const Member = mongoose.model("Member", memberSchema);
module.exports = Member;