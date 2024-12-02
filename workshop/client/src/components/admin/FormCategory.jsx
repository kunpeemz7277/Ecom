import React, { useState, useEffect } from 'react'
import { createCategory, listCategory, removeCategory } from '../../api/Category'
import useEcomStore from '../../store/ecom-store'
import { toast } from 'react-toastify';


const FormCategory = () => {
    //Javascript
    const token = useEcomStore((state) => state.token)
    const [name, setName] = useState('')
    //const [categories, setCategories] = useState([])

    const categories = useEcomStore((state) => state.categories)
    const getCategory = useEcomStore((state) => state.getCategory)

    useEffect(() => {
        getCategory(token)
    }, [])




    const handleSubmit = async (e) => {
        // code
        e.preventDefault()
        if (!name) {
            return toast.warning('Please fill data')
        }
        try {
            const res = await createCategory(token, { name })
            console.log(res.data.name);
            toast.success(`Add Category ${res.data.name} success!!!`)
            getCategory(token)
        } catch (err) {
            console.log(err)
        }
    }

    const handleRemove = async (id) => {
        //code
        console.log(id);
        try {
            const res = await removeCategory(token, id)
            console.log(res)
            toast.success(`Deleted success`)
            getCategory(token)
        } catch (err) {
            console.log(err)
        }

    }

    return (
        <div className='container mx-auto p-4 bg-white shadow-md'>
            <h1 className='text-3xl my-2'>
                Category Management
            </h1>
            <form className='my-4 ' onSubmit={handleSubmit}>
                <input
                    onChange={(e) => setName(e.target.value)}
                    className='text-2xl pt-2 pr-96 pb-2 pl-3 my-2 w-full border-2 border-gray-300 rounded-lg '
                    type='text'
                />
                
                <div className='rounded-t-lg overflow-hidden text-center p-4'>
                    <button className='bg-blue-500 font-bold py-3 px-48 rounded-full'>Add Catetory</button>
                </div>

            </form>

            <hr />

            <ul className='list-none'>
                {
                    categories.map((items, index) =>
                        <li
                            className='flex justify-between my-2'
                            key={index}>
                            <span className='text-xl'>
                                {items.name}
                            </span>

                            <button
                                className='bg-red-500 font-bold py-2 px-4 rounded-full'
                                onClick={() => handleRemove(items.id)}>Delete</button>
                        </li>
                    )
                }

            </ul>
        </div>
    )
}

export default FormCategory