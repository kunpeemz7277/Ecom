import React from 'react'
import { List } from 'lucide-react';
import useEcomStore from '../../store/ecom-store';
import { Link, useNavigate } from "react-router-dom";
import { createUserCart } from '../../api/user';
import { toast } from 'react-toastify';
import { numberFormat } from '../../utils/number';


const ListCart = () => {
    const cart = useEcomStore((state) => state.carts)
    const user = useEcomStore((state) => state.user)
    const token = useEcomStore((state) => state.token)
    const getTotalPrice = useEcomStore((state) => state.getTotalPrice)
    const clearCart = useEcomStore((state) => state.clearCart)

    const navigate = useNavigate()

    const handleSaveCart = async () => {
        await createUserCart(token, { cart })
            .then((res) => {
                console.log(res)
                toast.success('บักทึกใส่ตะกร้าสำเร็จ', { position: 'top-center' })
                navigate('/checkout')
            }).catch((err) => {
                console.log(err)
                toast.warning(err.response.data.message)
            })

    }

    const handleCancel = async () => {
        clearCart()
        toast.success('ยกเลิกตะกร้าสำเร็จ', { position: 'top-center' })
        navigate(-1)  
    }

    return (
        <div className='bg-gray-100 rounded-sm p-4'>
            {/* Header */}
            <div className='flex gap-4 mb-4'>
                <List size={36} />
                <p className='text-2xl font-bold'>รายการสินค้า {cart.length} รายการ</p>
            </div>

            {/* List */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                {/* Left */}
                <div className='col-span-2'>
                    {/* Card */}
                    {
                        cart.map((item, index) =>
                            <div className='bg-white p-2 rounded-md shadow-md mb-2' key={index}>
                                {/* Row 1 */}
                                <div className='flex justify-between mb-2'>
                                    {/* Left */}
                                    <div className='flex gap-2 items-center'>

                                        {
                                            //Function Show Image Cart
                                            item.images && item.images.length > 0
                                                ? <img
                                                    className='w-16 h-16 rounded-md'
                                                    src={item.images[0].url} />
                                                : <div className='w-16 h-16 bg-gray-200 
                                        rounded-md flex text-center items-center'>
                                                    No Image
                                                </div>
                                        }


                                        <div>
                                            <p className='font-bold'>{item.title}</p>
                                            <p className='text-sm'>{numberFormat(item.price)} x {item.count}</p>
                                        </div>
                                    </div>

                                    {/* Right */}
                                    <div>
                                        <div className='font-bold text-blue-500'>
                                            {numberFormat(item.price * item.count)}฿
                                        </div>
                                    </div>

                                </div>
                            </div>

                        )
                    }
                </div>


                {/* Right */}
                <div className='bg-white p-4 rounded-md shadow-md space-y-4'>
                    <p className='text-2xl font-bold'>ยอดรวม</p>
                    <div className='flex justify-between '>
                        <span>รวมสุทธิ</span>
                        <span className='text-2xl font-bold'>{numberFormat(getTotalPrice())}</span>
                    </div>

                    <div className='flex flex-col gap-3'>

                        {
                            user
                                ? <Link>
                                    <button
                                        disabled={cart.length < 1}
                                        onClick={handleSaveCart}
                                        className='bg-green-500  hover:bg-green-700 w-full rounded-md text-white py-2 shadow-md'
                                    >
                                        สั่งซื้อ
                                    </button>
                                </Link>
                                : <Link to={'/login'}>
                                    <button className='bg-blue-500  hover:bg-blue-700 w-full rounded-md text-white py-2 shadow-md'>เข้าสู่ระบบ</button>
                                </Link>


                        }


                        <Link to={'/shop'}>
                            <button className='bg-yellow-500  hover:bg-yellow-700 w-full rounded-md text-white py-2 shadow-md'>แก้ไขรายการ</button>
                        </Link>

                        {
                            cart.length > 0 
                            ? <button
                                disabled={cart.length < 1}
                                onClick={handleCancel}
                                className='bg-red-500  hover:bg-red-700 w-full rounded-md text-white py-2 shadow-md'>ยกเลิกรายการ</button>
                            : <div></div>
                        }


                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListCart