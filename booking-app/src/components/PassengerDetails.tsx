import {useRecoilState} from 'recoil'
import { passengerVisibilitySelector } from '../recoil/selectors/VisibilitySelectors';

const PassengerDetails = () => {
  const [, setPassengerVisibility] = useRecoilState(passengerVisibilitySelector);

  const handlePassengerVisible = () => {
    setPassengerVisibility((prevValue) => !prevValue);
  };

  return (
    <div id="passengerDetails" className='fixed top-0 right-0 bg-white z-10 h-[100%] px-8 py-12 w-[30vw] shadow-lg shadow-black space-y-4'>
      <i className="material-icons hover:cursor-pointer" onClick={handlePassengerVisible}>highlight_off</i>
      <h2 className='text-xl font-bold'>Passenger Details</h2>
      <div className="passenger-info space-y-2">
        <h4 className='text-md font-semibold flex items-center'>
          <i className="material-icons">account_circle</i> Passenger Information
        </h4>
        <div className='space-y-2'>
          <p>Passenger 1 | Seat 12</p>
          <label htmlFor="Name">
            Name <br />
            <input type="text" name="Name" id="Name" className='w-[90%] border-2 border-gray-500 p-2 mx-2 outline-none'/>
          </label>
          <div className="gender-age flex">
            <div id="gender" className='flex flex-col w-[50%]'>
            <label htmlFor="Gender">
              Gender <br />
              <input type="radio" name="Gender" id="Male"  className='m-2'/> Male
              <input type="radio" name="Gender" id="Female" className='m-2'/> Female
            </label>
            </div>
            <label htmlFor="Age">
              Age <br />
              <input type="text" name="Age" id="Age" className='w-[50%] border-2 border-gray-500 p-2 mx-2 outline-none'/>
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
            <input type="email" name="email" id="email" className='w-[90%] border-2 border-gray-500 p-2 mx-2 outline-none'/>
          </label>
          <br />
          <label htmlFor="Phone">
            {" "}
            Phone <br />
            <input type="phone" name="Phone" id="Phone" className='w-[90%] border-2 border-gray-500 p-2 mx-2 outline-none'/>
          </label>
        </div>
        <hr />
        <p><strong>Total Amount: INR</strong></p>
        <button className='bg-red-600 p-2 text-white hover:cursor-pointer hover:bg-red-700'>PROCEED TO PAY</button>
      </div>
    </div>
  );
};

export default PassengerDetails;
