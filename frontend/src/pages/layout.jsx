import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Homepage from './home.jsx';
import About from './About.jsx';
import AdminDashboard from './AdminDashboard.jsx';
import OrgDashboard from './OrgDashboard.jsx';
import AtnDashboard from './AtnDashboard.jsx';
import LoginSignup from './LoginSignup.jsx';
import NewEvent from "./NewEvent.jsx"
import './layout.css';
function Layout(){
    return(
        
        <div>
            <Router>
                <header>
                    <h1>BOOKKARO</h1>
                </header>

                <nav id="menu-bar">
                    <ul className="menu-ul">
                        <li className="menu-li"><Link to="/" className="home">Home</Link></li>
                        <li className="menu-li"><Link to="/about" className="about">About</Link></li>
                        <li className="menu-li">Gallery</li>
                        <li className="menu-li">Services</li>
                        <li className="menu-li"><Link to="/login" className="about">Login</Link></li>
                    </ul>
                </nav>

                <Routes>
                    <Route path="*" element={<Homepage />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/login" element={<LoginSignup />}></Route>
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/org" element={<OrgDashboard />} />
                    <Route path="/atn" element={<AtnDashboard />} />
                    <Route path="/org/newevent" element={<NewEvent />} />

                    

                </Routes>
            </Router>
    

        </div>
        
    );
}

export default Layout;