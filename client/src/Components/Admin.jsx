import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from "react"
import { get, post, put } from "../Services/service.common"
import { setValue } from "../Data/Reducers/member.reducer"
import { Link } from "react-scroll"
import 'bootstrap/dist/css/bootstrap.min.css';
import { InputGroup, FormControl, Button, Table } from 'react-bootstrap';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'


function Admin() {
    const [memberId, setMemberId] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        position: "",
        image: "",
        link: "",
    });

    const Members = useSelector(state => state.MemberReducer.members);
    const dispatch = useDispatch();

    useEffect(() => {
        getMembersAPI();
    }, [])


    const getMembersAPI = async () => {
        const members = await get("http://localhost:4000/getAllMembers");
        // console.log("data",members.data);
        dispatch(setValue(members.data))
    }

    const changeFormData = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData({ ...formData, [name]: value });
    }

    const addMember = async () => {
        try {
            const res = await post("http://localhost:4000/addTeamMember", formData);
            setFormData({
                ...formData,
                ["name"]: "",
                ["position"]: "",
                ["image"]: "",
                ["link"]: "",
            });
            getMembersAPI();
        }
        catch (e) {
            console.log("Error:", e);
        }
    }

    const editMember = (item) => {
        setFormData({
            ...formData,
            ["name"]: item.name,
            ["position"]: item.position,
            ["image"]: item.image,
            ["link"]: item.link,
        });
        setMemberId(item._id);
    }
    const updateMember = async () => {
        try {
            const res = await put(`http://localhost:4000/updateMember/${memberId}`, formData);
            setFormData({
                ...formData,
                ["name"]: "",
                ["position"]: "",
                ["image"]: "",
                ["link"]: "",

            });
            getMembersAPI();
        }
        catch (e) {
            console.log(e);
        }
    }
    const isActivate = async(member)=>{
        console.log("calling");
        const isActive = member.isActive?false:true;
        // console.log(isActive);
        console.log(member.name)
        setFormData({
            ...formData,
            ["name"]: member.name,
            ["position"]: member.position,
            ["image"]: member.image,
            ["link"]: member.link,
            ["isActive"]:isActive
        });

      console.log(formData);
      console.log(member.name)

        try {
            const res = await put(`http://localhost:4000/updateMember/${member._id}`,formData );
            console.log(res);
            getMembersAPI();
        }
        catch (e) {
            console.log(e);
        }
    }
   
    return (
        <div className="admin-page">
            <h1>Admin</h1>
            <div className="add-btn">

                <Link to="form"><Button variant="primary">Add Member</Button></Link>
            </div>
            <Table striped bordered hover className="member-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Image</th>
                        <th>Link</th>
                        <th>IsActive</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Members.map((member) => {
                            return (
                                <tr>
                                    <td>{member.name}</td>
                                    <td>{member.position}</td>
                                    <td>{member.image}</td>
                                    <td>{member.link}</td>
                                    <td><BootstrapSwitchButton
                                        checked={member.isActive}
                                        onlabel='active'
                                        offlabel='not active'
                                        onChange={()=>isActivate(member)}
                                    /></td>
                                    <td><Button variant="info" onClick={() => { editMember(member) }}>Edit</Button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>


            <div id="form" className="member-form">
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">NAME</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        placeholder="NAME"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        name="name"
                        value={formData.name}
                        onChange={changeFormData}
                    />
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">POSITION</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        placeholder="POSITION"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        name="position"
                        value={formData.position}
                        onChange={changeFormData}
                    />
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">IMAGE URL</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        placeholder="IMAGE URL"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        onChange={changeFormData}
                        value={formData.image}
                        name="image"
                    />
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">LINKEDIN URL</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        placeholder="LINKEDIN URL"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        name="link"
                        value={formData.link}
                        onChange={changeFormData}
                    />
                </InputGroup>
                <Button variant="dark" className="add-member" onClick={addMember}>ADD MEMBER</Button>
                <Button variant="dark" className="add-member" onClick={updateMember}>UPDATE MEMBER</Button>
            </div>
        </div>
    )
}

export default Admin
