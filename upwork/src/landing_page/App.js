import * as React from "react";
import {Routes, Route} from 'react-router-dom';

import Landing from './Landing.js';
import Forum from './Forum';
import Timeline from './Timeline.js';
import Login from './Login.js';
import Register from './Register.js';

export default function App() {
    return(
        <div className="App">
            <Routes>
                <Route path='/' element={<Landing/>}></Route>
                <Route path='/Forum.js' element={<Forum/>}></Route>
                <Route path='/Timeline.js' element={<Timeline/>}></Route>
                <Route path='/Login.js' element={<Login/>}></Route>
                <Route path='/Register.js' element={<Register/>}></Route>
            </Routes>
        </div>
    )
}


