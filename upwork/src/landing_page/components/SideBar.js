import {Col} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import {useEffect, useState } from 'react';
import '../styles/postStyle.css';
import axios from 'axios';
function Side(){
    const navigate = useNavigate();
    const url = 'http://localhost:8080/upwork_server/api/controller/tunnel.php';
    const [user, setUser] = useState('');

    let sideBarPackage = new FormData();
    sideBarPackage.append('function', 'fetchUserData')

    const UserSesh = () => {
        axios.post(url, sideBarPackage, {withCredentials: true})
        .then(response => {
            setUser(response.data);
        })
        .catch(error => alert(error.message));
    }

    useEffect(UserSesh, []);
    function AdminTab(){
        if(user.user_ID === 4){
            return(
                <li onClick={() => navigate('../timeline/admin')} className='sideContent nav-item d-flex col'>
                    <img className='sideIcon' src='http://localhost:8080/upwork_server/breaddit_assets/timeline_assets/admin.png'></img>
                    <p className='sideBarText text-white'>Admin View</p>
                </li>
            )
        }
    }

    return(
        <div className='sideBar d-none d-lg-block'>
            <div className='sideBarStick'>
                <br></br>
                <ul className='nav nav-pills flex-column mb-auto'>
                    <li onClick={() => navigate('../timeline')} className='sideContent nav-item d-flex col'>
                        <img className='sideIcon' src='http://localhost:8080/upwork_server/breaddit_assets/timeline_assets/home.png'></img>
                        <p className='sideBarText text-white'>Home</p>
                    </li>
                    {/* <li onClick={() => navigate('../timeline')} className='sideContent nav-item d-flex col'>
                        <img className='sideIcon' src='http://localhost:8080/upwork_server/breaddit_assets/timeline_assets/popular.png'></img>
                        <p className='sideBarText text-white'>Popular</p>
                    </li> */}
                    <AdminTab/>
                    {/* <hr></hr>
                    <li onClick={() => navigate('../timeline')} className='sideContent nav-item'>
                        <p className='sideBarText text-white'>About Breaddit</p>
                    </li>
                    <li onClick={() => navigate('../timeline')} className='sideContent nav-item'>
                        <p className='sideBarText text-white'>Help</p>
                    </li>
                    <li onClick={() => navigate('../timeline')} className='sideContent nav-item'>
                        <p className='sideBarText text-white'>Settings</p>
                    </li> */}
                </ul>
            </div>
        </div>
    )
}

export default Side;