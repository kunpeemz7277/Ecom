import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import useEcomStore from '../store/ecom-store'
import { ChevronDown, ShoppingBasket } from 'lucide-react';
import { GoogleLogout } from 'react-google-login'

import { toast } from 'react-toastify';


//จัด css ในส่วนแถบ Menu ด้านบน
function MainNav() {
    const clientId = "903808923973-3o9ugl6tf03i3psofsnqlhgbhn046hrc.apps.googleusercontent.com"

    //Javascript
    const carts = useEcomStore((state) => state.carts)
    const user = useEcomStore((state) => state.user)
    const [isOpen, setIsOpen] = useState(false)
    const logout = useEcomStore((state) => state.logout)

    const [profile, setProfile] = useState([])
    // console.log(Boolean(user))

    useEffect(() => {
        const initClient = () => {
            gapi.client.init({
                clientId: clientId,
                scope: ''
            })
        }
        gapi.load("client:auth2", initClient)
    })

    const toggleDropDown = () => {
        setIsOpen(!isOpen)
    }

    //console.log(carts.length)

    const handleLogout = () => {
        logout()
        //toast.success('Logout completed successfully.')
        navigate('/')
    }

    const logOut = () => {
        setProfile(null);
        logout()
        //toast.success('Logout completed successfully.')
        navigate('/')
    }

    const combinedLogoutHandler = () => {
        handleLogout();
        logOut();
    };



    return (

        // <nav className='bg-green-400'>
        //     <div className='mx-auto px-4'>
        //         <div className='flex justify-between h-16'>
        //             <div className='flex items-center gap-4'>
        //                 <Link to={'/'} className='text-2xl font-bold'>LOGO</Link>
        //                 <Link to={'/'}>Home</Link>
        //                 <Link to={'shop'}>Shop</Link>
        //                 <Link to={'cart'}>Cart</Link>
        //             </div>

        //             <div className='flex items-center gap-4'>
        //                 <Link to={'register'}>Register</Link>
        //                 <Link to={'login'}>Login</Link>
        //             </div>
        //         </div>
        //     </div>
        // </nav>

        <nav className='bg-white p-4 '>
            <div className='mx-auto px-4'>
                <div className='flex justify-between h-16'>
                    <div className='flex items-center gap-4 '>
                        <Link to={'/'} className='text-2xl font-bold'>TREEZ</Link>
                    </div>

                    <div className='flex items-center gap-4 '>
                        <ul className="flex space-x-4 heading-text gap-3 my-auto">
                            <Link to={'/'}>
                                <li className="hover:text-black underline-effect text-xl">หน้าแรก</li>
                            </Link>
                            <Link to={'/idea'}>
                                <li className="hover:text-black underline-effect text-xl">ไอเดีย</li>
                            </Link>
                            <Link to={'/aboutme'}>
                                <li className="hover:text-black underline-effect text-xl">เกี่ยวกับเรา</li>
                            </Link>
                            <Link to={'/shop'}>
                                <li className="hover:text-black underline-effect text-xl">สินค้า</li>
                            </Link>
                            <Link to={'/faq'}>
                                <li className="hover:text-black underline-effect text-xl">คำถามที่พบบ่อย</li>
                            </Link>
                            <Link to={'/article'}>
                                <li className="hover:text-black underline-effect text-xl">บทความ</li>
                            </Link>
                            <Link to={'/contact'}>
                                <li className="hover:text-black underline-effect text-xl">ติดต่อเรา</li>
                            </Link>
                            {/* Badge */}

                            {/* <Link to={'/cart'} className='relative'>
                                <li className="hover:text-black underline-effect text-xl">
                                    ตะกร้าสินค้า
                                    {
                                        carts.length > 0
                                        && (<span className='absolute -top-5 -right-6 bg-red-500 rounded-full px-2 text-black '>{carts.length}</span>)
                                    }
                                </li>
                            </Link> */}


                            {/* <button className='flex items-center gap-2 px-2 rounded-md hover:bg-gray-200'>
                                <img
                                    className='w-10 h-10'
                                    src="https://cdn.iconscout.com/icon/free/png-512/free-avatar-icon-download-in-svg-png-gif-file-formats--user-business-man-avatars-flat-icons-pack-people-456324.png?f=webp&w=256" />

                                <ChevronDown className='text-black'/>
                            </button> */}





                        </ul>

                        <Link to={'/cart'} >
                            <div >
                                <div className='flex items-center gap-4 '>
                                    <div className='rounded-3xl border-black p-3 border hover:shadow-xl hover:hover:-translate-y-1 duration-300'>
                                        <ShoppingBasket />
                                    </div>
                                    {
                                        carts.length > 0
                                        && (
                                            <p className='absolute right-[170px] top-[15px] bg-red-500 rounded-full px-2 text-black '>{carts.length}</p>
                                        )
                                    }

                                </div>
                            </div>
                        </Link>

                        <div className='flex items-center gap-4'>
                            <p className='text-5xl '>|</p>
                            {
                                user
                                    ? <div>
                                        <button
                                            onClick={toggleDropDown}
                                            className='flex items-center gap-2 px-2 py-3 rounded-md hover:bg-gray-200'
                                        >
                                            <img
                                                className='w-10 h-10'
                                                src="https://cdn.iconscout.com/icon/free/png-512/free-avatar-icon-download-in-svg-png-gif-file-formats--user-business-man-avatars-flat-icons-pack-people-456324.png?f=webp&w=256" />

                                            <ChevronDown className='text-black' />
                                        </button>

                                        {isOpen && (
                                            <div className='absolute mt-2 top-20 bg-white shadow-xl rounded-md border z-50'>
                                                <Link className='block px-4 py-2 hover:bg-gray-200 text-xl'>Profile</Link>
                                                <Link to={'/user/history'} className='block px-4 py-2 hover:bg-gray-200 text-xl'>History</Link>

                                                <GoogleLogout
                                                    clientId={clientId}
                                                    render={(renderprompt) => (
                                                        <button
                                                            onClick={renderprompt.onClick}
                                                            disabled={renderprompt.disabled}
                                                            className="block px-4 py-2 text-xl rounded hover:bg-gray-200"
                                                        >
                                                            Log out
                                                        </button>
                                                    )}
                                                    onLogoutSuccess={combinedLogoutHandler}
                                                />
                                                {/*<button
                                                        onClick={handleLogout}
                                                        className='block px-4 py-2 hover:bg-gray-200 text-xl'>
                                                        Logout
                                                </button> */}

                                            </div>
                                        )}
                                    </div>
                                    : <ul className="flex space-x-4 heading-text gap-3 my-auto">
                                        <Link to={'/login'}>
                                            <li className="hover:text-black underline-effect text-xl">เข้าสู่ระบบ</li>
                                        </Link>
                                    </ul>
                            }


                        </div>
                    </div>







                </div>
            </div>
        </nav>

        // <nav className="bg-white p-4 shadow">
        //     <div className="container mx-auto flex justify-between items-center px-4">
        //         <div className="text-2xl font-bold items-center">
        //             Treez
        //         </div>



        //         <ul className="flex space-x-4 heading-text gap-3 my-auto">
        //             <Link>
        //                 <li className="hover:text-black underline-effect ">หน้าหลัก</li>
        //             </Link>

        //             <Link>
        //                 <li className="hover:text-black underline-effect">ไอเดีย</li>
        //             </Link>

        //             <Link>
        //                 <li className="hover:text-gray-600 underline-effect">เกี่ยวกับเรา</li>
        //             </Link>

        //             <Link>
        //                 <li className="hover:text-gray-600 underline-effect">สินค้า</li>
        //             </Link>

        //             <Link>
        //                 <li className="hover:text-gray-600 underline-effect">คำถามที่พบบ่อย</li>
        //             </Link>

        //             <Link>
        //                 <li className="hover:text-gray-600 underline-effect">บทความ</li>
        //             </Link>

        //             <Link>
        //                 <li className="hover:text-gray-600 underline-effect">ติดต่อเรา</li>
        //             </Link>
        //         </ul>
        //         <p className='text-5xl '>|</p>
        //     </div>
        // </nav>
    )
}
export default MainNav