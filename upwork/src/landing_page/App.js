import * as React from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';
import Landing from './Landing.js';
import Forum from './Forum.js';
import Timeline from './Timeline.js';
import Login from './Login.js';
import Register from './Register.js';
import PostContent from './PostContent.js';
import Subreddit from './Subreddit.js';
import { useLocation } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const url = 'http://localhost:8080/upwork_server/api/controller/tunnel.php';

  let mainSessionPackage = new FormData();
  mainSessionPackage.append('function', 'fetchUserData')
  let rData = new FormData();
  rData.append('function', 'validateLogin');

  const [user, setUser] = useState([]);
  const [post, setPost] = useState([]);


  //Find login session
  async function Authen() {
    await axios.post(url, rData, {withCredentials: true})
    .then(response => {
        if(response.data != "found"){
          alert("Login session cannot be found.");
          navigate('../Login')
        }
    })
    .catch(error => alert(error.message));
  }
  //Get User session data
  async function UserSesh(){
    await axios.post(url, mainSessionPackage, {withCredentials: true})
    .then(response => {
      setUser(response.data);
    })
    .catch(error => alert(error.message));

  }

  async function PostFetch(){
    await axios.get(url, {params: {'function': 'fetchPost'}, withCredentials: true})
    .then(response => {
      setPost(response.data);
    });
  }

  //Caller for all async processes
  useEffect(() => {
    if (location.pathname !== '/Login') {
      Authen();
      UserSesh();
      PostFetch();
    }
  }, [location.pathname, navigate]);

  return (
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/timeline' element={<Timeline user={user} post={post}/>}/>
        <Route path='/timeline/forum' element={<Forum />} />
        <Route path='/timeline/comments/:id' component={PostContent} element={<PostContent user={user} post={post}/>} />
        <Route path='/timeline/r/:subreddit' component={Subreddit} element={<Subreddit user={user} />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>

  );
}
