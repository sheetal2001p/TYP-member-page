import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from "react"
import { post} from "../Services/service.common"


function MemberForm() {
    const [member, setMember] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        position: "",
        image: "",
        link: "",
    });


    // const Members = useSelector(state => state.MemberReducer.members);
    // console.log(Members);

   const changeFormData = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData({ ...formData, [name]: value });
        console.log(formData);
    }
    const addMember = async()=>{
        try {
            const res = await post("http://localhost:4000/addTeamMember", formData);
            console.log(res);
            setFormData({
                ...formData,
                ["name"]: "",
                ["position"]: "",
                ["image"]: "",
                ["link"]: "",
            });
        }
        catch (e) {
            console.log("Error:", e);
        }
    }
    return (
        <div className="member-form">
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
                    name = "image"
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
        </div>
    )
}

export default MemberForm
