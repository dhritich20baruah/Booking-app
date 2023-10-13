import React from "react";

const SeatPlan = () => {
  const right = [...Array(24).keys()].map((i) => i + 1);
  const left = Array.from({ length: 48 - 25 + 1 }, (_, index) => 25 + index);

  return (
    <section id="seatPlan">
      <div id="seat-Selection">
        <div id="bus">
          <div id="driver">
            <i className="material-icons" style={{ margin: "10px" }}>
              adjust
            </i>
          </div>
          <div id="seats">
            <div id="right">
              {right.map((item) => {
                return (
                  <div className="seat" key={item}>
                    {item}
                  </div>
                );
              })}
            </div>
            <div id="left">
              {left.map((item) => {
                return (
                  <div className="seat" key={item}>
                    {item}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div id="station">
        <p>Boarding Point</p>
        <label htmlFor="boarding">
          <input type="radio" name="boarding" id="boarding" />
          ISBT
        </label>
        <p>Drop Off Point</p>
        <label htmlFor="dropoff">
          <input type="radio" name="dropoff" id="dropoff" />
          Diburgarh ASTC
        </label>
        <hr />
        <p>Total Fare: INR 875</p>
        <button>CONTINUE</button>
      </div>
      <i className="material-icons" style={{ margin: "10px" }}>
        highlight_off
      </i>
    </section>
  );
};

export default SeatPlan;
