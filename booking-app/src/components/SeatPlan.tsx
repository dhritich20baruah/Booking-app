import {useRecoilState} from 'recoil'
import { passengerVisibilitySelector } from "../recoil/selectors/VisibilitySelectors";

const SeatPlan = () => {
  const right = [...Array(24).keys()].map((i) => i + 1);
  const left = Array.from({ length: 48 - 25 + 1 }, (_, index) => 25 + index);

  const [, setPassengerVisibility] = useRecoilState(passengerVisibilitySelector);

  const handlePassengerVisible = () => {
    setPassengerVisibility((prevValue) => !prevValue);
  };

  return (
    <section id="seatPlan" className='w-[100%] h-auto bg-gray-300 flex'>
      <div id="seat-Selection" className='w-[60%] m-20'>
        <div id="bus" className='flex w-fit bg-white h-fit border-2 border-black border-l-8'>
          <div id="driver" className='w-12 border-r-4 border-black bg-white'>
            <i className="material-icons" style={{ margin: "10px" }}>
              adjust
            </i>
          </div>
          <div id="seats" className='p-4 grid grid-rows-2 gap-y-4'>
            <div id="right" className='h-[50%] w-[100%] grid grid-cols-12 gap-x-1'>
              {right.map((item) => {
                return (
                  <div className="seat w-[2em] h-[2em] border-l-2 border-4 border-black hover:cursor-pointer hover:bg-red-500" key={item}>
                    {item}
                  </div>
                );
              })}
            </div>
            <div id="left" className='h-[50%] w-[100%] grid grid-cols-12 gap-x-1'>
              {left.map((item) => {
                return (
                  <div className="seat w-[2em] h-[2em] border-l-2 border-4 border-black hover:cursor-pointer hover:bg-red-500" key={item}>
                    {item}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div id="station" className='w-[30%] space-y-2 bg-white p-8 m-12 shadow-lg shadow-black'>
        <p className='font-bold'>Boarding Point</p>
        <label htmlFor="boarding">
          <input type="radio" name="boarding" id="boarding" />
          ISBT
        </label>
        <p className='font-bold'>Drop Off Point</p>
        <label htmlFor="dropoff">
          <input type="radio" name="dropoff" id="dropoff" />
          Diburgarh ASTC
        </label>
        <hr />
        <p className='font-bold'>Total Fare: INR 875</p>
        <button onClick={handlePassengerVisible} className='bg-red-600 p-4 text-white hover:bg-red-700 hover:cursor-pointer'>CONTINUE</button>
      </div>
    </section>
  );
};

export default SeatPlan;
