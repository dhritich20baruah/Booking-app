import React from 'react'
import redLogo from "../Images/redbuslogo.jpg";

const Buses = () => {
  return (
    <main id="buses">
        <nav id='busesNav'>
            <ul>
                <li><img src={redLogo} alt="" /></li>
                <li>BUS TICKETS</li>
                <li>rYde</li>
                <li>redRail</li>
            </ul>
            <ul>
                <li>Help</li>
                <li>Manage Booking <i className="material-icons">expand_more</i></li>
                <li><i className="material-icons">account_circle</i> <i className="material-icons">expand_more</i></li>
            </ul>
        </nav>
        <p id="busRoute"><strong>Home</strong> &gt; Bus TIckets &gt; Guwahati To Dibrugarh Bus &gt;</p>
        <hr />
        <p id='travelPlan'> Guwahati <i className="material-icons">arrow_forward</i> Dibrugarh <i className="material-icons">chevron_left</i>10 Oct Tue <i className="material-icons">chevron_right</i><button>Modify</button></p>
        <hr />
        <section>
            <div id="filters">
                <p>FILTERS</p>
                <ul>
                    <li>Live Tracking</li>
                    <li>Primo Bus</li>
                </ul>
                    <p>DEPARTURE TIME</p>
                <ul>
                    <li><input type="checkbox" name='before6am' id='before6am'/>Before 6 am</li>
                    <li><input type="checkbox" name="6am-12pm" id="6am-12pm" />6 am to 12 pm</li>
                    <li><input type="checkbox" name="12pm-6pm" id="12pm-6pm" />12 pm to 6 pm</li>
                    <li><input type="checkbox" name="after6pm" id="after6pm" />After 6 pm</li>
                </ul>
                    <p>ARRIVAL TIME</p>
                <ul>
                    <li><input type="checkbox" name='before6am' id='before6am'/>Before 6 am</li>
                    <li><input type="checkbox" name="6am-12pm" id="6am-12pm" />6 am to 12 pm</li>
                    <li><input type="checkbox" name="12pm-6pm" id="12pm-6pm" />12 pm to 6 pm</li>
                    <li><input type="checkbox" name="after6pm" id="after6pm" />After 6 pm</li>
                </ul>
            </div>
            <div id="busList">

            </div>
        </section>
    </main>
  )
}

export default Buses