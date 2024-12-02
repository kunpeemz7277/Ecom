import React, { useState, useEffect } from 'react'
import { getOrders } from '../../api/user'
import useEcomstore from '../../store/ecom-store'
import { dateFormat } from '../../utils/dateformat'

const HistoryCard = () => {
    const [orders, setOrders] = useState([])
    const token = useEcomstore((state) => state.token)

    useEffect(() => {
        //code
        hdlgetOrders(token)
    }, [])

    const hdlgetOrders = (token) => {
        getOrders(token)
            .then((res) => {
                //console.log(res)
                setOrders(res.data.orders)
            })
            .catch((err) => {
                console.log(err)
            });
    }

    const getStatusColor = (status) => {
        switch (status) {
            case "ยังไม่ดำเนินการ":
                return 'bg-gray-200'
            case "กำลังดำเนินการ":
                return 'bg-yellow-200'
            case "ดำเนินสำเร็จ":
                return 'bg-green-200'
            case "ยกเลิกดำเนินการ":
                return 'bg-red-200'
        }
    }

    return (
        <div className='space-y-4'>
            <h1 className='text-2xl font-bold'>ประวัติการสั่งซื้อ</h1>


            <div className='space-y-4'>
                {/* Card Loop Order*/}
                {
                    orders?.map((item, index) => {
                        //console.log(item)

                        return (
                            <div className='bg-gray-100 p-4 rounded-md shadow-md' key={index}>
                                {/* ทีมงาน header */}
                                <div className='flex justify-between'>
                                    {/* Left */}
                                    <div>
                                        <p className='text-sm'>Order date</p>
                                        <p className='font-bold'>{dateFormat(item.updatedAt)}</p>
                                    </div>

                                    {/* Right */}
                                    <div>
                                        <span className={`${getStatusColor(item.orderStatus)} px-2 py-1 rounded-full`}>
                                            {item.orderStatus}
                                        </span>
                                    </div>
                                </div>


                                {/* ทีมงาน table Loop Product*/}
                                <div>
                                    <table className='border w-full'>
                                        <thead>
                                            <tr className='bg-gray-200'>
                                                <th>สินค้า</th>
                                                <th>ราคา</th>
                                                <th>จำนวน</th>
                                                <th>รวม</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {
                                                item.products?.map((product, index) => {
                                                    //console.log(product)

                                                    return (
                                                        <tr key={index}>
                                                            <td>{product.product.title}</td>
                                                            <td>{product.product.price}</td>
                                                            <td>{product.count}</td>
                                                            <td>{product.count * product.product.price}</td>
                                                        </tr>
                                                    )
                                                })
                                            }

                                        </tbody>

                                    </table>
                                </div>





                                {/* ทีมงาน Total */}
                                <div>
                                    <div className='text-right'>
                                        <p>ราคาสุทธิ</p>
                                        <p>{item.cartTotal}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }



            </div>

        </div>
    )
}

export default HistoryCard