import React, { useEffect, useState } from 'react'
import useEcomStore from '../../store/ecom-store'
import { createProduct, readProduct, listProduct, updateProduct } from '../../api/product'
import { toast } from 'react-toastify'
import Uploadfile from './Uploadfile'
//ใช้ useParams หา id
import { useParams, useNavigate } from 'react-router-dom'

const initialState = {
    title: "ต้นลิ้นมังกร",
    description: "กระถางขนาด 9 นิ้ว",
    price: 97,
    quantity: 20,
    categoryId: ``,
    images: []
}

const FormEditProduct = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const token = useEcomStore((state) => state.token)
    const getCategory = useEcomStore((state) => state.getCategory)
    const categories = useEcomStore((state) => state.categories)
    //console.log(products)

    const [form, setForm] = useState(initialState)

    useEffect(() => {
        // code
        getCategory()
        //20 คือจำนวนสินค้า
        fetchProduct(token, id, form)
    }, [])

    const fetchProduct = async (token, id, form) => {
        try {
            //code
            const res = await readProduct(token, id, form)
            console.log('res from backend', res)
            setForm(res.data)

        } catch (err) {
            console.log('Error fetch data', err)

        }
    }

    console.log(form)


    const handleOnChange = (e) => {
        console.log(e.target.name, e.target.value)
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await updateProduct(token, id, form)
            console.log(res)
            toast.success(`เพิ่มข้อมูล ${res.data.title} สำเร็จ`)
            navigate('/admin/product')
        } catch (err) {
            console.log(err)
        }

    }

    return (
        <div className='container mx-auto p-4 bg-white shadow-md'>
            <form onSubmit={handleSubmit}>
                <h1>แก้ไขข้อมูลสินค้า</h1>

                <div className='mb-1'>
                    <input className='text-2xl pt-2 pb-2 pl-3 my-2 w-full border-2 border-gray-300 rounded-lg '
                        value={form.title}
                        onChange={handleOnChange}
                        placeholder='Title'
                        name='title'
                    />
                </div>

                <div className='mb-1'>
                    <textarea className='text-2xl pt-2 pb-2 pl-3 my-2 w-full border-2 border-gray-300 rounded-lg'
                        value={form.description}
                        onChange={handleOnChange}
                        placeholder='Description'
                        name='description'
                    />
                </div>

                <div className='grid gap-6 mb-6 md:grid-cols-2'>
                    <div className='mb-1'>
                        <input className='text-xl my-2 py-2 px-3 border-2 border-gray-300 rounded-lg '
                            type='number'
                            value={form.price}
                            onChange={handleOnChange}
                            placeholder='Price'
                            name='price'
                        />
                    </div>

                    <div className='mb-1'>
                        <input className='text-xl my-2 py-2 px-3 border-2 border-gray-300 rounded-lg '
                            type='number'
                            value={form.quantity}
                            onChange={handleOnChange}
                            placeholder='Quantity'
                            name='quantity'
                        />
                    </div>

                    <div className='mb-1'>
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


                <div className='rounded-t-lg overflow-hidden text-center p-4'>
                    <button className='bg-yellow-500 my-4 font-bold py-3 px-48 rounded-full'>แก้ไขสินค้า</button>
                </div>

                <hr />
                <br />

            </form>
        </div>
    )
}

export default FormEditProduct