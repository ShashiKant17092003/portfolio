import './App.css'
import Navbar from './components/Navbar.jsx'
import { Routes,Route } from 'react-router-dom'
import Home from './components/pages/Home.jsx'
import Resume from './components/pages/Resume.jsx'
import Work from './components/pages/Work.jsx'
import Contact from './components/pages/Contact.jsx'

function App() {
  const handleContextMenu = (event) => {
    event.preventDefault();
  };
  return (
    <div className='App' onContextMenu={handleContextMenu}>
      <Navbar />
      <Routes className="rot">
        <Route path='/portfolio' element={<Home />} />
        {/* <Route path='/home' element={<Home />} /> */}
        <Route path='/resume' element={<Resume />} />
        <Route path='/work' element={<Work />} />
        <Route path='/contact' element={<Contact />} />
      </Routes>
    </div>
  )
}

export default App
