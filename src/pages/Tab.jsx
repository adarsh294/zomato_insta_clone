import React from 'react'
import { Link,useLocation } from "react-router-dom";
const Tab = () => {
   const location = useLocation();
  return (
      <div className="a grid grid-cols-3  fixed w-full md:w-[450px] h-[40px]  backdrop-blur-2xl bg-transparent md:bottom-0 z-100 bottom-[40px] flex ">
              <div  data-tab="home" className=" flex items-center justify-center h-full">
                <Link to="/"  className='flex items-center justify-center h-full w-full'>
              <span className={`material-symbols-outlined !text-[20px] sm:!text-[24px] md:!text-[28px]
            ${location.pathname === "/" ? "text-blue-500" : "text-white"}
          `}>home</span>
                </Link>
              </div>
              <div className="flex items-center justify-center h-full">
                <Link to="/reel"  className='flex items-center justify-center h-full w-full'>
                    <span  className={`material-symbols-outlined !text-[20px] sm:!text-[24px] md:!text-[28px]
            ${location.pathname === "/reel" ? "text-blue-500" : "text-white"}
          `}>animated_images</span>
                </Link>
              </div>
              <div  data-tab="save"  className="flex items-center justify-center h-full">
                <Link to="/savereel"  className='flex items-center justify-center h-full w-full'>
              <span  className={`material-symbols-outlined !text-[20px] sm:!text-[24px] md:!text-[28px]
            ${location.pathname === "/savereel" ? "text-blue-500" : "text-white"}
          `}>bookmarks</span>
                </Link>
              </div>
            </div>
  )
}

export default Tab
