import React, { useState, useEffect } from 'react'
import { getOrdersAdmin, changeOrderStatus } from '../../api/admin'
import useEcomStore from '../../store/ecom-store'
import { toast } from 'react-toastify'
import { numberFormat } from '../../utils/number'
import { dateFormat } from '../../utils/dateformat'


const TableOrders = () => {
    const token = useEcomStore((state) => state.token)
    const [orders, setOrders] = useState([])

    useEffect(() => {
        //code
        handleGetOrder(token)
    }, []);

    const handleGetOrder = (token) => {
        getOrdersAdmin(token)
            .then((res) => {
                setOrders(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleChangeOrderStatus = (token, orderId, orderStatus) => {
        //code
        changeOrderStatus(token, orderId, orderStatus)
            .then((res) => {
                console.log(res);
                toast.success('Update Status Success!!')
                handleGetOrder(token)
            })
            .catch((err) => {
                console.log(err)
            })
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
        <div className='container mx-auto p-4 bg-white shadow-md'>
            <div>
                <table className='w-full'>
                    <thead>
                        <tr className='bg-gray-200 border'>
                            <th>ลำดับ</th>
                            <th>ผู้ใช้งาน</th>
                            <th>ที่อยู่</th>
                            <th>วันที่</th>
                            <th>สินค้า</th>
                            <th>รวม</th>
                            <th>สถานะ</th>
                            <th>จัดการ</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            orders?.map((item, index) => {
                                console.log(item)

                                return (
                                    <tr key={index} className='border'>
                                        <td className='text-center'>{index + 1}</td>
                                        <td className='text-center'>
                                            <p>{item.orderBy.email}</p>

                                        </td>

                                        <td className='text-center'>
                                            <p>{item.orderBy.address}</p>
                                        </td>

                                        <td className='text-center'>
                                            {dateFormat(item.createdAt)}
                                        </td>

                                        <td className='py-4 pl-10'>

                                            {
                                                item.products?.map((product, index) =>
                                                    <li key={index}>
                                                        {product.product.title} {"  "}
                                                        <span className='text-sm'>{product.count} x {numberFormat(product.product.price)}</span>
                                                    </li>
                                                )
                                            }

                                        </td>

                                        <td>{numberFormat(item.cartTotal)}</td>

                                        <td className='text-center'>
                                            <span className={`${getStatusColor(item.orderStatus)} px-2 py-1 rounded-full`}>
                                                {item.orderStatus}
                                            </span>
                                        </td>

                                        <td className='text-center'>
                                            <select
                                                value={item.orderStatus}
                                                onChange={(e) =>
                                                    handleChangeOrderStatus(token, item.id, e.target.value)}
                                            >
                                                <option>ยังไม่ดำเนินการ</option>
                                                <option>กำลังดำเนินการ</option>
                                                <option>ดำเนินสำเร็จ</option>
                                                <option>ยกเลิกดำเนินการ</option>
                                            </select>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TableOrders