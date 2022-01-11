
import React from 'react';
import './App.css';
import Navbar from './components/index';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages';
import About from './pages/about';
import Clock from './pages/Clock';
import Transactional from './pages/transactional';

// import Blogs from './pages/blogs';
// import SignUp from './pages/signup';
// import Contact from './pages/contact';
  
function App() {
return (
    <Router>
    <Navbar />
    <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/clock' element={<Clock />} />
        <Route path='/transactional' element={<Transactional />} />
       
    </Routes>
    </Router>
);
}
  
export default App;


// import React from "react";
// import logo from "./logo.svg";
// import "./App.css";

// function App() {
//   const [data, setData] = React.useState(null);

//   React.useEffect(() => {
//     fetch("/api")
//       .then((res) => res.json())
//       .then((data) => setData(data.message));
//   }, []);

//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>{!data ? "Loading..." : data}</p>
//       </header>
//     </div>
//   );
// }

// export default App;
