import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import BusContext from './components/Context'
import { useState } from 'react'

function App() {
  const [origin, setOrigin] = useState("")
  const [destination, setDestination] = useState("")
  const [doj, setDoj] = useState("")

  return (
    <>
    <BusContext.Provider value={{origin, setOrigin, destination, setDestination, doj, setDoj}}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
        </Routes>
      </BrowserRouter>
    </BusContext.Provider>
    </>
  )
}

export default App
