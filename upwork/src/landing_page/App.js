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
import { useEffect } from 'react';
import axios from 'axios';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const url = 'http://localhost:8080/upwork_server/api/controller/tunnel.php';

  let rData = new FormData();
  rData.append('function', 'validateLogin');

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

  useEffect(() => {
    if (location.pathname !== '/Login') {
      Authen();
    }
  }, [location.pathname, navigate]);

  return (

      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/timeline' element={<Timeline />} />
        <Route path='/timeline/forum' element={<Forum />} />
        <Route path='/timeline/comments/:id' component={PostContent} element={<PostContent />} />
        <Route path='/timeline/r/:subreddit' component={Subreddit} element={<Subreddit />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>

  );
}
