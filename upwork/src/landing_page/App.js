import * as React from "react";
import {Routes, Route} from 'react-router-dom';

import Landing from './Landing.js';
import Forum from './Forum.js';
import Timeline from './Timeline.js';
import Login from './Login.js';
import Register from './Register.js';
import PostContent from './PostContent.js';
import Subreddit from './Subreddit.js';

export default function App() {
    return(
        <div className="App">
            <Routes>
                <Route path='/' element={<Landing />} />
                <Route path='/timeline' element={<Timeline />} />
                <Route path='/timeline/forum' element={<Forum />} />
                <Route path='/timeline/postcontent' element={<PostContent />} />
                <Route path='/timeline/r/subreddit' element={<Subreddit />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
            </Routes>
        </div>
    )
}


