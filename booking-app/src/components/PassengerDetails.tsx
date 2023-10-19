import {useRecoilState} from 'recoil'
import { passengerVisibilitySelector } from '../recoil/selectors/VisibilitySelectors';

const PassengerDetails = () => {
  const [, setPassengerVisibility] = useRecoilState(passengerVisibilitySelector);

  const handlePassengerVisible = () => {
    setPassengerVisibility((prevValue) => !prevValue);
  };

  return (
    <div id="passengerDetails">
      <i className="material-icons" onClick={handlePassengerVisible}>highlight_off</i>
      <h2>Passenger Details</h2>
      <div className="passenger-info">
        <h4>
          <i className="material-icons">account_circle</i> Passenger Information
        </h4>
        <div>
          <p>Passenger 1 | Seat 12</p>
          <label htmlFor="Name">
            Name <br />
            <input type="text" name="Name" id="Name" />
          </label>
          <div className="gender-age">
            <div id="gender">
            <label htmlFor="Gender">
              Gender <br />
              <input type="radio" name="Gender" id="Male" /> Male
              <input type="radio" name="Gender" id="Female" /> Female
            </label>
            </div>
            <label htmlFor="Age">
              Age <br />
              <input type="text" name="Age" id="Age" />
            </label>
          </div>
        </div>
        <h4>
          <i className="material-icons">email</i> Contact Details
        </h4>
        <div>
          <label htmlFor="email">
            {" "}
            Email ID <br />
            <input type="email" name="email" id="email" />
          </label>
          <br />
          <label htmlFor="Phone">
            {" "}
            Phone <br />
            <input type="phone" name="Phone" id="Phone" />
          </label>
        </div>
        <hr />
        <p><strong>Total Amount: INR</strong></p>
        <button>PROCEED TO PAY</button>
      </div>
    </div>
  );
};

export default PassengerDetails;
