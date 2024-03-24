import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Profil from '../pages/Profil';
import Trending from '../pages/Trending';
import Home from '../pages/Home';
import React from 'react';

export default function Index() {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/profil" element={<Profil />} />
                    <Route path="/trending" element={<Trending />} />
                </Routes>
            </Router>
        </div>
    );
}
