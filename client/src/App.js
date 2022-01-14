
import React from 'react';
import './App.css';
import NavbarClass from './components/index';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './pages/about';
import Transactional from './pages/transactional';
import { Row } from 'react-bootstrap';
function App() {
    return (
        <>
            <Row>
                <NavbarClass />
                <Router>
                    <Routes>
                        <Route exact path='/' element={<Transactional />} />
                        <Route path='/about' element={<About />} />
                    </Routes>
                </Router>
            </Row>
           
        </>
    );
}
export default App;
