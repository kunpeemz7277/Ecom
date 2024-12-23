import React from 'react'
import { ShoppingCart } from 'lucide-react';
import useEcomStore from '../../store/ecom-store';
import { Link } from 'react-router-dom'
import { numberFormat } from '../../utils/number';
import { motion } from "framer-motion"


const ProductCard = ({ item }) => {
    //const actionAddtoCart = useEcomStore((state) => state.actionAddtoCart)
    //console.log(item)

    return (
        <Link to={'/shop/detail/' + item.id}
            onClick={() => window.scrollTo({ top: 0})}>
            <motion.div
                initial={{
                    opacity: 0,
                    scale: 0.5
                }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
            >
                <div className='border rounded-md shadow-md p-2 w-48'>
                    <div>
                        {
                            item.images && item.images.length > 0
                                ? <img src={item.images[0].url} className='rounded-md w-full h-24 object-cover hover:scale-110 hover:duration-200' />
                                : <div className='w-full h-24 bg-gray-200 rounded-md text-center flex items-center justify-center shadow'>
                                    No Image
                                </div>
                        }

                    </div>


                    <div className='py-2'>
                        <p className='text-xl truncate'>{item.title}</p>
                        <p className='text-sm text-gray-500 truncate'>{item.description}</p>
                    </div>

                    {/* <Link to={'/shop/detail/' + item.id}> */}
                    <div className='flex justify-between items-end'>
                        <span className='text-xl font-bold'>{numberFormat(item.price)}฿</span>
                        {/* <button
                        onClick={() => actionAddtoCart(item)}
                        className='bg-lime-500 rounded-3xl px-2 py-1 hover:bg-lime-600 shadow-md'>
                        <ShoppingCart />
                    </button> */}

                        {/* <Link to={'/shop/detail/' + item.id}>
                            <p>Detail</p>
                        </Link> */}

                    </div>
                    {/* </Link> */}
                </div>
            </motion.div>
        </Link>
    )
}

export default ProductCard