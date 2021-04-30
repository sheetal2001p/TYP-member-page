const express = require("express");

const router = express.Router();

const {addMemberController,getAllMembersController,updateMemberController,deleteMemberController} = require("../controllers/member.controller");

router.post("/addTeamMember",addMemberController);

router.get("/getAllMembers",getAllMembersController);

router.put("/updateMember/:id",updateMemberController);

router.delete("/deleteMember/:id",deleteMemberController);

module.exports = router;