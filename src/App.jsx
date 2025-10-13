import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Explore from './pages/Explore'
import NavBar from './components/NavBar'
import Materials from './pages/Materials'
 
import './App.css'

function App() {


  return (
    <>
      <NavBar />
      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/explore' element={<Explore />} />
        <Route path='/materials' element={<Materials />} />
      </Routes>
      
    </>
  )
}

export default App;
