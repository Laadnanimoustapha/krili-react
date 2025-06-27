import { BrowserRouter as Router, Routes, Route, Link, BrowserRouter } from 'react-router-dom'
// import './App.css'
import Item from './pages/Item'
import Profile from './pages/Profile'


function App() {
  return (  
    <Router>
      <Routes>
        <Route path="/" element={<Item />} />
        <Route path='/Profile' element={<Profile />} />
      </Routes>
    </Router>
  )
}

export default App
