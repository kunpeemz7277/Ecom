import React, { useEffect, useState } from 'react'
import useEcomStore from '../../store/ecom-store'
import { createProduct, deleteProduct } from '../../api/product'
import { toast } from 'react-toastify'
import Uploadfile from './Uploadfile'
import { Link } from 'react-router-dom'
import { Pencil, Trash2 } from 'lucide-react';
import { numberFormat } from '../../utils/number'
import { dateFormat } from '../../utils/dateformat'

const initialState = {
    title: "",
    description: "",
    price: 0,
    quantity: 0,
    categoryId: '',
    images: []
}

const FormProduct = () => {
    const token = useEcomStore((state) => state.token)
    const getCategory = useEcomStore((state) => state.getCategory)
    const categories = useEcomStore((state) => state.categories)
    const getProduct = useEcomStore((state) => state.getProduct)
    const products = useEcomStore((state) => state.products)
    //console.log(products)

    const [form, setForm] = useState({
        title: "",
        description: "",
        price: 0,
        quantity: 0,
        categoryId: '',
        images: []
    })

    useEffect(() => {
        // code
        getCategory()
        //20 คือจำนวนสินค้า
        getProduct(100)
    }, [])

    const handleOnChange = (e) => {
        //console.log(e.target.name, e.target.value)
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await createProduct(token, form)
            console.log(res)
            setForm(initialState)
            getProduct()
            toast.success(`เพิ่มข้อมูล ${res.data.title} สำเร็จ`)
        } catch (err) {
            console.log(err)
        }
    }

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure to delete?')) {
            console.log(id)
            try {
                //code
                const res = await deleteProduct(token, id)
                console.log(res)
                toast.success('Deleted สินค้าเรียบร้อยแล้ว')
                getProduct()
            } catch (err) {
                console.log(err)

            }
        }
    }

    return (
        <div className='container mx-auto p-4 bg-white shadow-md'>
            <form onSubmit={handleSubmit}>
                <h1 className='text-3xl my-2'>เพิ่มข้อมูลสินค้า</h1>


                <div className='mb-1 mt-4'>
                    <h1 className='text-lg font-bold pl-1'>ชื่อสินค้า</h1>
                    <input className='text-2xl pt-2 pb-2 pl-3 my-2 w-full border-2 border-gray-300 rounded-lg '
                        value={form.title}
                        onChange={handleOnChange}
                        placeholder='กรอกชื่อสินค้า'
                        name='title'
                    />
                </div>

                <div className='mb-1'>
                    <h1 className='text-lg font-bold pl-1'>รายละเอียดสินค้า</h1>
                    <textarea className='text-2xl pt-2 pr-96 pb-2 pl-3 my-2 w-full border-2 border-gray-300 rounded-lg '
                        value={form.description}
                        onChange={handleOnChange}
                        placeholder='กรอกรายละเอียดสินค้า'
                        name='description'
                    />
                </div>

                <div className='grid gap-6 mb-6 md:grid-cols-2'>
                    <div className='mb-1'>
                        <h1 className='text-lg font-bold pl-1'>ราคาสินค้า</h1>
                        <input className='text-xl my-2 py-2 px-3 border-2 border-gray-300 rounded-lg '
                            type='number'
                            value={form.price}
                            onChange={(e) => {
                                // กรองค่าลบ (-) ออก
                                const value = e.target.value;
                                if (!value.includes('-')) {
                                    handleOnChange(e); // เรียกใช้ handleOnChange ต่อเมื่อค่าไม่มี -
                                }
                            }}
                            placeholder='กรอกราคาสินค้า'
                            name='price'
                        />
                    </div>

                    <div className='mb-1'>
                    <h1 className='text-lg font-bold pl-1'>จำนวนสินค้าในสต๊อก</h1>
                        <input className='text-xl my-2 py-2 px-3 border-2 border-gray-300 rounded-lg '
                            type='number'
                            value={form.quantity}
                            onChange={(e) => {
                                // กรองค่าลบ (-) ออก
                                const value = e.target.value;
                                if (!value.includes('-')) {
                                    handleOnChange(e); // เรียกใช้ handleOnChange ต่อเมื่อค่าไม่มี -
                                }
                            }}
                            placeholder='กรอกจำนวนสินค้า'
                            name='quantity'
                        />
                    </div>

                    <div className='mb-1'>
                    <h1 className='text-lg font-bold pl-1'>ขนาดกระถาง</h1>
                        <select
                            className='text-xl my-2 py-2 px-3 border-2 border-gray-300 rounded-lg '
                            name='categoryId'
                            onChange={handleOnChange}
                            required
                            value={form.categoryId}
                        >
                            <option value="" disabled>Please Select</option>
                            {
                                categories.map((items, index) =>

                                    <option key={index} value={items.id}>{items.name}</option>
                                )
                            }
                        </select>
                    </div>

                    <div className='mb-1'>
                        {/*Upload file*/}
                        <Uploadfile form={form} setForm={setForm} />
                    </div>

                </div>

                <hr className='my-4' />


                <div className='rounded-t-lg overflow-hidden text-center p-4'>
                    <button className='bg-blue-500 my-4 font-bold py-3 px-48 rounded-full'>เพิ่มสินค้า</button>
                </div>

                <hr />
                <br />
                <table className="table w-full border">
                    <thead>
                        <tr className='bg-gray-200 border'>
                            <th scope="col" >No.</th>
                            <th scope="col" >รูปภาพ</th>
                            <th scope="col">ชื่อสินค้า</th>
                            <th scope="col">รายละเอียด</th>
                            <th scope="col">ราคา</th>
                            <th scope="col">จำนวน</th>
                            <th scope="col">จำนวนที่ขาย</th>
                            <th scope="col">วันที่อัพเดต</th>
                            <th scope="col">จัดการ</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            products.map((items, index) => {
                                //console.log(items)
                                return (
                                    <tr className='text-center ' key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td align='center'>
                                            {
                                                items.images.length > 0
                                                    ? <img
                                                        className='w-24 h-24 rounded-lg shadow-md'
                                                        src={items.images[0].url} />
                                                    : <div className='w-24 h-24 bg-gray-200 rounded-md flex items-center justify-center shadow-sm'>No Image</div>
                                            }
                                        </td>
                                        <td>{items.title}</td>
                                        <td>{items.description}</td>
                                        <td>{numberFormat(items.price)}</td>
                                        <td>{items.quantity}</td>
                                        <td>{items.sold}</td>
                                        <td>{dateFormat(items.updatedAt)}</td>
                                        <td className='flex gap-2 justify-center'>

                                            <Link to={'/admin/product/' + items.id}>
                                                <p className='bg-yellow-500 rounded-md p-5 shadow-md hover:scale-105 hover:-translate-y-1 hover:duration-200'>
                                                    <Pencil />
                                                </p>
                                            </Link>

                                            <p
                                                className='bg-red-500 rounded-md p-5 shadow-md hover:scale-105 hover:-translate-y-1 hover:duration-200 h-16'
                                                onClick={() => handleDelete(items.id)}>
                                                <Trash2 />
                                            </p>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>

            </form>
        </div>
    )
}

export default FormProduct