import React from 'react'
import { Outlet } from 'react-router-dom'
import MainNav from '../components/MainNav'
import Footer from '../components/MainFooter'


const LayoutUser = () => {

  //Main Nav แถบหน้าเมนู
  return (
    <div>
        {location.pathname !== "/login" && location.pathname !== "/register" && <MainNav />}
        {/* <MainFooter/> */}
        <main className='h-full px-4 mt-2 mx-auto'>
            <Outlet />
        </main>
        {location.pathname !== "/login" && location.pathname !== "/register" && location.pathname !== "/user/payment" && <Footer />}
        
    </div>
  )
}

export default LayoutUser