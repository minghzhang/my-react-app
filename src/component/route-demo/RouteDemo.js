import React from 'react';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom'
import Home from "./Home"
import About from "./About"
import Contact from "./Contact"
import BookManager from "./BookManager";
import BookManagerAntD from "./BookManagerAntD";

export default function RouteDemo() {

    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/contact"> Contact</Link></li>
                        <li><Link to="/book-manager"> BookManager</Link></li>
                    </ul>
                </nav>
            </div>

            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/contact" element={<Contact/>}/>
                <Route path="/book-manager" element={<BookManager/>}/>
            </Routes>
        </Router>
    );
}