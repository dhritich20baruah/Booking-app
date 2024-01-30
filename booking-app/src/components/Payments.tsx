import React from 'react'
import logo from "../Images/redbuslogo2.jpg";

const Payments = () => {
  return (
    <div className='z-20 fixed top-0 left-0 w-[100vw] h-[100vh] bg-white'>
           <nav className="homeNav flex justify-between">
        <img
          src={logo}
          alt=""
          id="mainLogo"
          className="w-[5em] h-[3em] my-auto mx-[2em] pr-[2em]"
        />
        <ul id="help-nav" className="flex justify-between my-auto mx-[1em]">
          <li className="flex items-center mx-[1em] py-[0.5em] px-[1em] rounded-md">
            <i className="material-icons">headset_mic</i> Help
          </li>
          <li className="flex items-center mx-[1em] py-[0.5em] px-[1em] rounded-md">
            <i className="material-icons">account_circle</i> My Account
          </li>
        </ul>
      </nav>
      <div className='bg-red-500 p-3'>
        <ul className='text-yellow-200 flex justify-evenly'>
        <li className='flex'>origin <i className="material-icons mx-3">arrow_forward</i> destination</li>
        <li>Please pay within timer</li>
        </ul>
      </div>
      <div className='main flex'>
        <div className="payment-options w-[60%] p-10"></div>
        <div className="passenger-info w-[40%] p-10">
            <div className='shadow-lg shadow-black p-5'>
            <h1 className='text-red-500'>Bus name</h1>
            <hr />
            </div>
        </div>
      </div>
    </div>
  )
}

export default Payments