import React, { ReactElement } from 'react';
import Navbar from '../navbar';
import { Toaster } from "@/components/ui/toaster"

interface props {
  children: ReactElement
}

const Appshell = ({ children }: props) => {
  return (
    <>
      <Toaster/>
      <div className='w-full flex flex-col gap-16'>
        <div className='w-full border-b shadow-lg sticky top-0 left-0 bg-white'>
          <div className='xl:max-w-screen-xl lg:max-w-screen-lg md:max-w-screen-md sm:max-w-screen-sm mx-auto w-full xl:px-0 lg:px-0 px-6'>
            <Navbar />
          </div>
        </div>

        <div className='xl:max-w-screen-xl lg:max-w-screen-lg md:max-w-screen-md sm:max-w-screen-sm mx-auto w-full xl:px-0 lg:px-0 px-6'>
          {children}
        </div>

        <div className='w-full'>
          <div className='xl:max-w-screen-xl lg:max-w-screen-lg md:max-w-screen-md sm:max-w-screen-sm mx-auto w-full xl:px-0 lg:px-0 px-6'>

          </div>
        </div>
      </div>

    </>
  );
};

export default Appshell;