import * as React from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';
import Landing from './Landing.js';
import Forum from './Forum.js';
import Timeline from './Timeline.js';
import Login from './Login.js';
import Register from './Register.js';
import PostContent from './PostContent.js';
import Subreddit from './Subreddit.js';
import User from './User.js';
import AdminView from './AdminView.js';
import { useLocation } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const url = 'http://localhost:8080/upwork_server/api/controller/tunnel.php';
  const [user, setUser] = useState([]);
  const [post, setPost] = useState([]);

  let mainSessionPackage = new FormData();
  mainSessionPackage.append('function', 'fetchUserData')

  let rData = new FormData();
  rData.append('function', 'validateLogin');

  //Find login session
  async function Authen() {
    await axios.post(url, rData, {withCredentials: true})
    .then(response => {
        if(response.data == 404){
          navigate('../Login')
        }
        else{
          console.log(response.data);
          setUser(response.data);
        }
    })
    .catch(error => alert(error.message));
  }

  async function PostFetch(){
    await axios.get(url, {params: {'function': 'fetchPost'}, withCredentials: true})
    .then(response => {
      setPost(response.data);
    });
  }

  async function UpdateKarma(){
    await axios.get(url, {params: {'function': 'updateKarma'}, withCredentials: true})
    .then(response => {
      console.log("Karma Updated");
    })
    .catch(error => console.log("Karma warning!"));
  }

  //Caller for all async processes
  useEffect(() => {
    if (location.pathname !== '/Login' && location.pathname !== '/register' && location.pathname !== '/') {
      Authen();
      PostFetch();
      UpdateKarma();
    }
  }, [location.pathname, navigate]);

  return (
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/timeline' element={<Timeline user={user} post={post} url={url}/>}/>
        <Route path='/timeline/admin' element={<AdminView user={user} post={post} url={url}/>}/>
        <Route path='/timeline/forum' element={<Forum url={url}/>} />
        <Route path='/timeline/comments/:id' component={PostContent} element={<PostContent user={user} post={post}/>} />
        <Route path='/timeline/r/:subreddit' component={Subreddit} element={<Subreddit user={user} url={url}/>} />
        <Route path='/timeline/u/:user' component={User} element={<User userData={user} url={url}/>} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>

  );
}
