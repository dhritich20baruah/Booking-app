import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import BusContext from './components/Context'
import { PaymentContext } from './components/Context'
import { useState } from 'react'

function App() {
  const [origin, setOrigin] = useState("")
  const [destination, setDestination] = useState("")
  const [doj, setDoj] = useState("")
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);

  return (
    <>
    <BusContext.Provider value={{origin, setOrigin, destination, setDestination, doj, setDoj}}>
      <PaymentContext.Provider value={{paymentSuccess, setPaymentSuccess}}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
        </Routes>
      </BrowserRouter>
      </PaymentContext.Provider>
    </BusContext.Provider>
    </>
  )
}

export default App
