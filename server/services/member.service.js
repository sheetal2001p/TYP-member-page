const Member = require("../models/member.model");
const HttpError = require("../models/HttpError");

const addMemberService = async(member)=>{

    const{name}= member;
    try{
        const isExist = await Member.findOne({name});
        if(isExist){
            const error = new HttpError(404,"Member already exist")
            return {error} ;
        }
        const newmember = new Member(member);
        await newmember.save();
        return {data:newmember};
    }
    catch(err){
        const error = new HttpError(500,"Something went wrong!")
        return {error};    
    }

}
const getAllMembersService = async()=>{
    try {
        const  members = await Member.find();
        return {data:members};
    }
    catch (err) {
        const error = new HttpError(500,"Something went wrong!");
        return {error};
    }
}

const updateMemberService = async(_id,data)=>{
    
    try{
        const member = await Member.findByIdAndUpdate(
            {_id}, 
            {$set:data},
            {new:true}
        );
        if(!member){
            const error = new HttpError(404,"Member Not Found")
            return {error};
        }
        return {data:member};
    }
    catch(err){
        
    }

}
const deleteMemberService = async(_id)=>{
    try{
      const member = await Member.findByIdAndDelete({_id});
      if(!member){
        const error = new HttpError(404,"Member doesn't exist!");
        return {error}
      }                                                                                                                                                          
      return {data:"Member Deleted"};
    }
    catch(err){
        const error = new HttpError(404,"Something went wrong!!");
        return {error}
    }
}

module.exports = {
    addMemberService,
    getAllMembersService,
    updateMemberService,
    deleteMemberService
}