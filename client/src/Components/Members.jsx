import react from "react"
import image from "../images/Devansh.png"
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react"
import { get } from "../Services/service.common"
import { setText,setTheme} from "../Data/Reducers/theme.reducer"
import{setValue} from "../Data/Reducers/member.reducer"
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


function Members() {
    const Members = useSelector(state => state.MemberReducer.members);
    const {value,isDark} = useSelector(state => state.ThemeReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        getMembersAPI();
    }, [])


    const getMembersAPI = async () => {
        const members = await get("http://localhost:4000/getAllMembers");
        dispatch(setValue(members.data))
    }

    const toggleTheme = ()=>{
        dispatch(setText(value=="Dark"?"Light":"Dark"));
        dispatch(setTheme(isDark?false:true));

    }
    const style ={
        color:isDark?"white":"black",
        backgroundImage:isDark?"linear-gradient(rgb(0, 0, 0) 0px, rgb(0, 0,0))":"linear-gradient(rgb(232, 241, 254) 0px, rgb(255, 255, 255))"
    }

    return (
        <div>
            <div className="members-section" style={style}>
                <div className="members-heading">
                    MEET OUR TEAM
                </div>
                <Button variant="info" onClick={toggleTheme}>{value}</Button>
                <div className="membersContainer">
                    
                        {   
                            Members.map((item) => {
                                if(item.isActive==true){
                                return (
                                       
                                      <div className="member">
                                        <a href="https://www.google.com/">
    
                                            <div>
                                                <div className="member-image">
                                                    <img src={item.image} alt="Member-image" />
                                                </div>
                                                <div className="member-description">
                                                    <div className="memberName">
                                                        {item.name}
                                                   </div>
                                                    <div className="memberPosition">
                                                        {item.position}
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                        </div>
                                     )
                                }

                            })
                        } 

                   

                </div>
            </div>
        </div>
    )
}

export default Members;
