import './App.css'
import Sidebar from './components/Sidebar'
import Home from './components/Home'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import PopulationGraph from './components/PopulationGraph'
import PriceCard from './components/PriceCard'
import Metamask from './components/Metamask'
function App() {

  return (
    <div className='flex h-full w-full '>
      <ToastContainer hideProgressBar />
     <Router >
        <Sidebar />
        <Routes>
        <Route path='/' element={<Navigate to="/home" replace />} />
          <Route path='/home' element={<Home/>} />
          <Route path='/graph' element={<PopulationGraph/>} />
          <Route path='/price' element={<PriceCard/>} />
          <Route path='/metamask' element={<Metamask/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
