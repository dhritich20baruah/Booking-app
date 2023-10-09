import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Buses from './components/Buses'
import './App.css'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/Buses' element={<Buses/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
