import {Navbar, Container, Dropdown, Form, Button, Row, Col} from 'react-bootstrap';
import '../styles/navbarStyle.css';
import axios from 'axios';
import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';


function TopNav(){
    const [user, setUser] = useState([]);
    const navigate = useNavigate();
    const url = 'http://localhost:8080/upwork_server/api/controller/tunnel.php';
    let mainSessionPackage = new FormData();
    mainSessionPackage.append('function', 'fetchUserData')
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [createToggled, setCreateToggled] = useState(false);
    const [userEditToggled, setUserEditToggled] = useState(false);
    const [editUserToggled, setEditUserToggled] = useState(false);
    const [search, setSearch] = useState('');
    
    const editToggle = () => {
        setUserEditToggled(!userEditToggled);
    }

    const csToggle = () => {
        setCreateToggled(!createToggled);
    };

    const editUserToggle = (event) => {
        console.log(event.target.value);
        setEditUserToggled(!editUserToggled);
    }

    function handleSearchChange(event){
        console.log(event.target.value);
        setSearch(event.target.value);
    }

    const handleDropdownToggle = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };
    
    
    const UserSesh = () => {
        axios.post(url, mainSessionPackage, {withCredentials: true})
        .then(response => {
            setUser(response.data);
        })
        .catch(error => alert(error.message));
    }

    useEffect(UserSesh, []);

    function logout(){

        const logoutPack = new FormData();
        logoutPack.append('function', 'logout');

        axios.post(url, logoutPack, {withCredentials: true})
        .then(response => {
            alert("You are being logged out.");
            navigate('../login');
        })
        .catch(error => alert(error.message));
    }

    function toUser(){
        const userUrl = "../timeline/u/" + user.username;
        navigate(userUrl, {state:{userData: user}});
    }



    function CreateSubreddit(){
        const [subName, setSubName] = useState('');
        const [subImg, setSubImg] =useState('');
        const [subCover, setSubCover] = useState('');
        const [subDesc, setSubDesc] = useState('');

        function handleNameChange(event){
            setSubName(event.target.value);
        }
        function handleImgChange(event){
            setSubImg(event.target.value);
        }
        function handleCoverChange(event){
            setSubCover(event.target.value);
        }
        function handleDescChange(event){
            setSubDesc(event.target.value);
        }

        function previewImage(event){
            const fileInput = event.target;
            const file = fileInput.files[0];
            const imagePreview = document.getElementById('image-preview')
            const imageToUploadContainer = document.getElementById('imageToUploadContainer');
            const imageUploadedContainer = document.getElementById('imageUploadedContainer');
            const formUpload = document.getElementById('formUpload')
    
            if(file){
                const reader = new FileReader();
                reader.onload = function(event){
                    imagePreview.src = event.target.result;
                    setSubImg(event.target.result);
                    imageToUploadContainer.style.display = 'none';
                    imageUploadedContainer.style.display = 'block';
                };
                reader.readAsDataURL(file);
            }
            else{
                imagePreview.src = '';
                imagePreview.style.display = 'none';
            }
    
        }

        function previewCoverImage(event){
            const fileInput = event.target;
            const file = fileInput.files[0];
            const CimagePreview = document.getElementById('coverImage-preview')
            const CimageToUploadContainer = document.getElementById('imageToCoverUploadContainer');
            const CimageUploadedContainer = document.getElementById('coverImageUploadedContainer');
            const formUpload = document.getElementById('formCoverUpload')
    
            if(file){
                const reader = new FileReader();
                reader.onload = function(event){
                    CimagePreview.src = event.target.result;
                    setSubCover(event.target.result);
                    CimageToUploadContainer.style.display = 'none';
                    CimageUploadedContainer.style.display = 'block';
                };
                reader.readAsDataURL(file);
            }
            else{
                CimagePreview.src = '';
                CimagePreview.style.display = 'none';
            }
    
        }

        async function imageProcess(event, content, name, from){
            event.preventDefault();
            let iData = new FormData();
            iData.append('from', from)
            iData.append('function', 'image_parser');
            iData.append('baseString', content);
            iData.append('name', name);
    
            //Converts base64 image data to image file via php API
            return await axios.post(url, iData)
            .then(response => {
                console.log(response.data);
                return response.data;
            })
            .catch(error => alert(error.message))
            
        }

        async function handleSubmit(event){
            event.preventDefault();
            let sData = new FormData();
            sData.append('function', 'submitSubreddit');
            sData.append('subName', subName);
            sData.append('subDesc', subDesc);

            if(subCover != ''){
                console.log('Has Cover');
                let coverLoc = await imageProcess(event, subCover, subName, 'cover');
                sData.append('cover', coverLoc);
            }

            if(subImg != ''){
                console.log('Has Profile')
                let profLoc = await imageProcess(event, subImg, subName, 'subProfile');
                sData.append('profile', profLoc);
            }

            await axios.post(url, sData, {withCredentials: true})
            .then(response => {
                alert('Subreddit has been successfully created!');
            })
            .catch(error => alert(error.message));
        }

        if(createToggled){       
            document.body.style.overflow = 'hidden';
            return(
                <div className='cs_graybg' id='createSubredditFrame'>
                    <div className='cs_mainWindow'>
                            <div className='d-flex col justify-content-between align-items-center'>
                                <h1>Create a Community</h1>
                                <img onClick={csToggle} className='cs_closeButton' src='http://localhost:8080/upwork_server/breaddit_assets/timeline_assets/close.png'></img>
                            </div>
                            <hr></hr>
                            <Form>
                                <Row>
                                    <Col className='col-12 col-sm-4'>
                                        <Form.Group className="cs_formUpload mb-3" controlId="formBasicImage" id='formUpload'>
                                            <div id='imageToUploadContainer'> 
                                                <label for="file-upload" className="cs_custom-file-upload">
                                                    <i className="fa fa-cloud-upload"></i> +
                                                </label>
                                                <input id="file-upload" type="file" onChange={event => previewImage(event)}/>
                                            </div>
                                            <div className='cs_formImageCont' id='imageUploadedContainer' style={{display: 'none'}}>
                                                <img className='cs_formImage' id='image-preview'  src='' alt='Uploaded Image'></img>
                                            </div>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="formBasicTitle">
                                            <h6>Name</h6>
                                            <p style={{fontSize: '0.7rem'}}>Community names including capitalization can no longer be changed after this!</p>
                                            <Form.Control as='input' className='titleInput' type="title" title='asd' onChange={handleNameChange}/>
                                        </Form.Group>
                                    </Col>
                                </Row>
    
                                <Row>
                                    <Col className='col-12'>
                                        <Form.Group className="cs_coverFormUpload mb-3" controlId="formBasicImage" id='formCoverUpload'>
                                            <div id='imageToCoverUploadContainer'> 
                                                <label for="file-Coverupload" className="cs_covercustom-file-upload">
                                                    <i className="fa fa-cloud-upload"></i> Cover Image
                                                </label>
                                                <input id="file-Coverupload" type="file" onChange={event => previewCoverImage(event)}/>
                                            </div>
                                            <div className='cs_coverFormImageCont' id='coverImageUploadedContainer' style={{display: 'none'}}>
                                                <img id='coverImage-preview' className='cs_coverformImage' src='' alt='Uploaded Image'></img>
                                            </div>
                                        </Form.Group>
                                    </Col>
                                </Row>
    
                                <Row>
                                    <Form.Group className="mb-3" controlId="formBasicTitle">
                                        <h6>Description</h6>
                                        <Form.Control as='textarea' className='titleInput' type="title" title='asd' onChange={handleDescChange}/>
                                    </Form.Group>
                                </Row>
                                <hr></hr>
                                <Button id='0' type='submit' onClick={(event) => handleSubmit(event)}>Post</Button>
                            </Form>
                    </div>
                </div>
            )
        }
        else{
            document.body.style.overflow = '';
        }
    }

    return(
        <div className='navFollower'>
            <CreateSubreddit onToggle={csToggle}/>
            <Navbar expand="lg" className='mainNav'>
                <Container>
                    <Navbar.Brand href="/breaddit/timeline" className='titleNav'>Breaddit</Navbar.Brand>

                    <form className='searchBar'>
                            <img style={{scale: '45%'}} src='http://localhost:8080/upwork_server/breaddit_assets/timeline_assets/search_min.png'></img>
                            <input onChange={handleSearchChange} className='searchInput' type="search" placeholder='Search Breaddit'></input>
                    </form>

                    <Dropdown show={isDropdownOpen} onToggle={handleDropdownToggle}>
                        <div className='userInfoBox'>
                            <div className='d-flex col align-items-center' onClick={handleDropdownToggle}>
                                <div className='nav_profileImageCont'>
                                    <img src={user.profile_image} className='nav_profileImage'></img>
                                </div>
                                <div className='userInfoMargin'>
                                    <p className='username'>u/{user.username}</p>
                                    <p className='karmaCount'>{user.karma} Karma</p>
                                </div>
                                <img src='http://localhost:8080/upwork_server/breaddit_assets/timeline_assets/down_arrow_min.png' className='downArrow'></img>
                            </div>
                            <Dropdown.Menu className='nav_dropdownBox'>
                                <div className='nav_myStuffs'>My Stuff</div>
                                <div className='nav_dropItem' onClick={() => toUser()}>Profile</div>
                                <div className='nav_dropItem' onClick={(event) => }>User Settings</div>
                                <div className='nav_dropItem' onClick={(event) => csToggle(event)}>Create a Community</div>
                                <hr style={{opacity: '100%'}}></hr>
                                <div className='nav_myStuffs'>View Settings</div>
                                <div className='nav_dropItem'>
                                    <Form className='d-flex col'>
                                        Dark Mode
                                        <Form.Check style={{marginLeft: '10px'}}
                                            type="switch"
                                            id="custom-switch"
                                        />
                                    </Form>
                                </div>
                                <hr style={{opacity: '100%'}}></hr>
                                <div className='nav_myStuffs'>Account Settings</div>
                                <div className='nav_dropItem' onClick={() => logout()}>Logout</div>
                            </Dropdown.Menu>
                        </div>

                    </Dropdown>


                </Container>    
            </Navbar>
        </div>
    )
}

export default TopNav;