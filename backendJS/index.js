const express = require('express')
const app =  express()
const cors = require('cors')
const mongoose = require('mongoose')
const PORT = 5000

app.use(express.json())
app.use(cors())

const { calculateTotalFare, searchBuses } = require('./data/busData');

mongoose
  .connect("mongodb://0.0.0.0:27017/bookingApp")
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res)=>{
    res.send("BOOKING APP")
})

app.post('/getBus', async (req, res)=>{
    const {origin, destination, doj} = req.body
    const inputDoj = doj;
    const formattedDoj = inputDoj.replace(/^(\d{2})\/(\d{2})\/(\d{4})$/, "$3-$2-$1");
  
    const busArr = searchBuses(origin, destination, formattedDoj)

    const totalDistance = calculateTotalFare(origin, destination)
    const busList = busArr.buses.map((item)=>{
      return {
        ...item,
        fare: Math.ceil(item.fare * totalDistance)
      }
    })
  
    res.json({buses: busList} )
  })

app.listen(PORT, ()=>{
    console.log(`Server is running at ${PORT}`)
})