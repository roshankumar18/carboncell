import React, { useEffect, useRef, useState } from 'react'
import { useMediaQuery } from "@uidotdev/usehooks"
import { MenuIcon } from 'lucide-react'
import classNames from 'classnames'
import { sidebarData } from '../constants/sidebarData'
import { Link, useLocation } from 'react-router-dom'

const Sidebar = () => {
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [isCollapsed, setIsCollapsed] = useState(isMobile)
  const sidebarRef = useRef(null)
  const navbarRef = useRef(null)
  const location = useLocation()

  useEffect(()=>{
    if(isMobile) {
        collapse()
    }else{
        resetWidth()
    }
},[isMobile])

  const collapse = () => {
    if (sidebarRef.current ) {
      setIsCollapsed(true);
      sidebarRef.current.style.width = "0";
      navbarRef.current.style.setProperty("width", "100%");
      navbarRef.current.style.setProperty("left", "0");
    }
  }

  const resetWidth = () => {
    if (sidebarRef.current ) {
      setIsCollapsed(false);

      sidebarRef.current.style.width = isMobile ? "100%" : "240px";
    }
  };

  return (
    <>

    <aside ref={sidebarRef}  className='h-screen   text-4xl flex overflow-y-auto flex-col w-0  md:w-60 
     bg-primary text-white rounded-r-3xl'
>
        <div className='flex justify-between items-center p-2'>
          <div className='text-3xl'>Carbon Cell</div>
          <button onClick={collapse}>
            <MenuIcon className='h-6 w-6'/>
          </button>
        </div>
        <div className='flex flex-col gap-1'>
          {sidebarData.map(({name},index)=>{
            return (
              <div key={index} className={classNames('text-lg font-normal ')}>
                <Link className={classNames('block hover:bg-green-400 p-2',
                location.pathname === `/${name.toLowerCase()}` && 'bg-green-400')} to={name.toLowerCase()}>{name}</Link>
              </div>
            )
          })}
        </div>

    </aside>
    <div 
    ref={navbarRef}
    onClick={resetWidth}
    className={classNames(' absolute  top-0 z-[99] left-60 w-[calc(100%-240px)]',
    isMobile && "left-0 w-full",
    isCollapsed && 'fixed top-0 bg-gray-100')}>

<nav className={classNames('bg-transparent px-3 py-2 w-full')}>
            {isCollapsed && <MenuIcon className='h-6 w-6  text-muted-foreground text-black hover:cursor-pointer'/>}
        </nav>

    </div>
    </>
  )
}

export default Sidebar