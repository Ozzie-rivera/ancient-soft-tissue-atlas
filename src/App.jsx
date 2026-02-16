import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Explore from './pages/Explore'
import NavBar from './components/NavBar'
import Materials from './pages/Materials'
import Statistics from './pages/Statistics'
import Publications from './pages/Publications'
import NotFound from './pages/NotFound'
import ImageDetail from './pages/ImageDetail'


 
import './App.css'

function App() {


  return (
    <>
      <NavBar />
      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/explore' element={<Explore />} />
          <Route path='/image/:id' element={<ImageDetail />} />
        <Route path='/materials' element={<Materials />} />
        <Route path='/statistics' element={<Statistics />} />
        <Route path='/publications' element={<Publications />} />
        <Route path="*" element={<NotFound />} />

      </Routes>
      
    </>
  )
}

export default App;
