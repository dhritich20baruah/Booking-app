import React from 'react'

const PassengerDetails = () => {
  return (
    <div>
        <h2>Passenger Details</h2>
        <div className="passenger-info">
          <h4><i className="material-icons"></i> Passenger Information</h4>
          <form action="">
            <p>Passenger 1 | Seat 12</p>
            <label htmlFor="Name"> Name <br />
              <input type="text"  name='Name' id="Name"/>
            </label>
            <div>
              <label htmlFor="Gender"> Gender <br />
                <input type="radio" name="Gender" id="Male" />
                <input type="radio" name="Gender" id="Female" />
              </label>
              <label htmlFor="Age"> Age <br />
                <input type="text" name='Age' id="Age" />
              </label>
            </div>
          </form>
        </div>
    </div>
  )
}

export default PassengerDetails