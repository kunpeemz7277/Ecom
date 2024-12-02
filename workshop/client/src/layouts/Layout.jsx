import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import MainNav from '../components/MainNav'

const Layout = () => {
  const location = useLocation();

  //Main Nav แถบหน้าเมนู
  return (
    <div>

      {location.pathname !== "/login" && location.pathname !== "/register" && <MainNav />}
      <main className='h-full px-4 mt-2 mx-auto'>
        <Outlet />
      </main>

    </div>
  )
}

export default Layout