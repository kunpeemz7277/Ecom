import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import MainNav from '../components/MainNav'
import Footer from '../components/MainFooter'


const Layout = () => {
  const location = useLocation();

  //Main Nav แถบหน้าเมนู
  return (
    <div>

      {location.pathname !== "/login" && location.pathname !== "/register" && <MainNav />}
      
      <main className='h-full px-4 mt-2 mx-auto'>
        <Outlet />
      </main>
      
      {location.pathname !== "/login" && location.pathname !== "/register" && <Footer />}
    </div>
  )
}

export default Layout