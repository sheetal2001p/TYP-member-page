const memberService = require("../services/member.service")


const addMemberController =async (req, res,next) => {
    const member = req.body;
    const response = await memberService.addMemberService(member);
    const{data,error} = response;
    if(error){
        return next(error);
    }
    res.send(data);
}

const getAllMembersController = async(req,res,next)=>{
   const response = await memberService.getAllMembersService();
   const{data,error} = response;
   if(error){
       return next(error);
   }
   res.send(data);
}

const updateMemberController = async(req,res,next)=>{
    const _id = req.params.id;
    const member = req.body;
    const response = await memberService.updateMemberService(_id,member);
    const{data,error} = response;
    if(error){
        return next(error);
    }
    res.send(data);
}
const deleteMemberController = async(req,res,next)=>{
    const _id = req.params.id;
    const response = await memberService.deleteMemberService(_id);
    const{data,error} = response;
    if(error){
        return next(error);
    }
    res.send(data);
}
module.exports = {addMemberController,getAllMembersController,updateMemberController,deleteMemberController}
