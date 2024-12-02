import React, { useEffect, useState } from 'react'
import { ShoppingCart } from 'lucide-react';
import useEcomStore from '../store/ecom-store'
import { useLocation } from 'react-router-dom';
import { Trash2, Minus, Plus } from 'lucide-react';
import { numberFormat } from '../utils/number';

const Detail = () => {
    const carts = useEcomStore((state) => state.carts)
    // const actionAddtoCart = useEcomStore((state) => state.actionAddtoCart)
    const actionUpdateQuantity = useEcomStore((state) => state.actionUpdateQuantity)
    const actionRemoveProduct = useEcomStore((state) => state.actionRemovePeoduct)
    const actionAddtoCartV2 = useEcomStore((state) => state.actionAddtoCartV2)


    const [quantity, setQuantity] = useState(1);
    const location = useLocation();

    const [foundNumber, setFoundNumber] = useState(null);

    const getProduct = useEcomStore((state) => state.getProduct)
    const products = useEcomStore((state) => state.products)

    const handleDecrement = () => {
        if (quantity > 1) { // ป้องกันจำนวนต่ำกว่า 1
            setQuantity(quantity - 1);
        }
    };

    const handleIncrement = () => {
        setQuantity(quantity + 1);
    };

    useEffect(() => {
        const match = location.pathname.match(/\d+/);

        if (match) {
            const number = match[0];
            //console.log(`พบตัวเลขใน route: ${number}`);
            setFoundNumber(Number(number));
        }
    }, [location]);

    const matchedProduct = products.find((product) => product.id === foundNumber);

    console.log(matchedProduct);




    return (
        <div className='bg-gray-300 h-screen my-5'>

            {matchedProduct ? (
                <div>

                    <div className='flex items-start justify-around '>
                        <div className='my-6'>
                            {
                                matchedProduct.images && matchedProduct.images.length > 0
                                    ? <img
                                        src={matchedProduct.images[0].url}
                                        alt="Main Product"
                                        className="w-[110%] max-w-md object-cover rounded-lg"
                                    />
                                    : <div className='w-16 h-16 bg-gray-200 
                                    rounded-md flex text-center items-center'>
                                        No Image
                                    </div>
                            }


                            <div className="flex mt-4 gap-2">
                                <button className="p-2 bg-gray-200 rounded-full">
                                    <span className="text-xl">{"<"}</span>
                                </button>
                                {[1, 2, 3].map((img, index) => (
                                    <img
                                        key={index}
                                        src={`https://via.placeholder.com/100?text=Image+${img}`}
                                        alt={`Thumbnail ${img}`}
                                        className="w-16 h-16 object-cover border border-gray-200 rounded-lg"
                                    />
                                ))}
                                <button className="p-2 bg-gray-200 rounded-full">
                                    <span className="text-xl">{">"}</span>
                                </button>
                            </div>
                        </div>



                        <div className='lg:w-1/2'>
                            <h1 className="text-2xl font-semibold my-6">{matchedProduct.title}</h1>

                            {/* Price */}
                            <div className="flex items-baseline my-2">
                                <span className="text-orange-600 text-[38px] font-semibold mr-4">{matchedProduct.price}฿</span>
                            </div>

                            <div className='flex justify-between'>
                                <div className="flex items-baseline my-2">
                                    <span className="line-through text-gray-500 text-xl">฿35</span>
                                    <span className="text-green-500 text-xl ml-2">-17%</span>
                                </div>
                                <div className="flex items-baseline my-2">
                                    {/* Share & Favorite */}
                                    <div className="flex gap-4">
                                        <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md">
                                            <span>แชร์</span>
                                        </button>
                                        <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md">
                                            <span>❤</span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className='border border-black '>
                                <hr />
                            </div>


                            {/* ทำจำนวนสินค้ากับราคารวม */}


                            {/* Quantity Selector */}
                            <div class="relative flex items-center max-w-[8rem] my-4">
                                <button
                                    type="button"
                                    id="decrement-button"
                                    data-input-counter-decrement="quantity-input"
                                    onClick={handleDecrement}
                                    class="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                    <svg class="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
                                    </svg>
                                </button>
                                <input
                                    type="number"
                                    id="quantity-input"
                                    value={quantity}
                                    data-input-counter
                                    aria-describedby="helper-text-explanation"
                                    class="bg-gray-50 border-x-0 border-gray-300 h-[42px] text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    defaultValue={1}
                                    required
                                    min="1"
                                />
                                <button
                                    type="button"
                                    id="increment-button"
                                    data-input-counter-increment="quantity-input"
                                    onClick={handleIncrement}
                                    class="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                    <svg class="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                                    </svg>
                                </button>
                            </div>
                            <button
                                onClick={() =>
                                    actionAddtoCartV2(matchedProduct, Number(document.querySelector('#quantity-input').value))}
                                className="bg-lime-500 rounded-3xl px-5 py-3 hover:bg-lime-600 shadow-md my-5">
                                <div className='flex my-1'>
                                    <p>เพิ่มลงในตะกร้า</p>
                                    <ShoppingCart />
                                </div>
                            </button>


                        </div>
                    </div>

                    <div className='border border-black mx-6'>
                        <hr />
                    </div>

                    <div className='bg-white'>
                        <h1 className='text-2xl mx-6'>รายละเอียดสินค้า</h1>
                        <h1 className='text-lg mx-6 ml-16'>{matchedProduct.description}</h1>
                    </div>
                </div>
            ) : (
                <p>ไม่พบสินค้าที่ตรงกับ ID {foundNumber}</p>
            )}


        </div>
    )
}

export default Detail