import React, { useEffect, useState } from 'react'
import { ShoppingCart } from 'lucide-react';
import useEcomStore from '../store/ecom-store'
import { useLocation } from 'react-router-dom';
//import { numberFormat } from '../utils/number';


const Detail = () => {
    //const actionUpdateQuantity = useEcomStore((state) => state.actionUpdateQuantity)
    //const actionRemoveProduct = useEcomStore((state) => state.actionRemovePeoduct)
    const actionAddtoCartV2 = useEcomStore((state) => state.actionAddtoCartV2)

    const [quantity, setQuantity] = useState(1);
    const location = useLocation();

    const [foundNumber, setFoundNumber] = useState(null);

    const products = useEcomStore((state) => state.products)

    const handleDecrement = () => {
        if (quantity > 1) {
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
            setFoundNumber(Number(number));
        }
    }, [location]);

    const matchedProduct = products.find((product) => product.id === foundNumber);
    console.log(matchedProduct);


    // Set the initial image as the first in the array or empty string
    const [selectedImage, setSelectedImage] = useState("");

    useEffect(() => {
        if (matchedProduct?.images?.[0]?.url) {
            setSelectedImage(matchedProduct.images[0].url);
        }
    }, [matchedProduct]);

    const handleImageClick = (imageUrl) => {
        setSelectedImage(imageUrl);
    };

    return (
        <div className='h-screen my-5'>
            {matchedProduct ? (
                <div>
                    <div className='flex items-start justify-around '>

                        <div className='my-6'>
                            {/* Display the selected image with fixed size */}
                            {selectedImage ? (
                                <img
                                    src={selectedImage}
                                    alt="Selected Product"
                                    className="w-[600px] h-[500px] object-cover rounded-lg hover:shadow-xl duration-300"
                                />
                            ) : (
                                <div className='w-[400px] h-[400px] bg-gray-200 rounded-md flex justify-center items-center'>
                                    No Image
                                </div>
                            )}

                            {/* Image thumbnails with fixed size */}
                            <div className="flex mt-4 gap-2">
                                {matchedProduct.images?.map((img, index) => (
                                    <img
                                        key={index}
                                        src={img.url}
                                        alt={`Thumbnail ${index + 1}`}
                                        className={`w-[60px] h-[60px] object-cover border ${selectedImage === img.url ? 'border-blue-500' : 'border-gray-200'} rounded-lg cursor-pointer`}
                                        onClick={() => handleImageClick(img.url)}
                                    />
                                ))}
                            </div>
                        </div>


                        <div className='lg:w-1/2'>
                            <h1 className="text-4xl font-semibold my-6">{matchedProduct.title}</h1>
                            <div className="flex items-baseline">
                                <span className="text-orange-600 text-[38px] font-semibold mr-4">{matchedProduct.price}฿</span>
                            </div>
                            <hr className='border-black my-5' />
                            <div className='flex justify-between text-base mr-[60%] my-7'>
                                <p className='text-xl text-gray-500'>Size</p>
                                <p>{matchedProduct.category.name}</p>
                            </div>
                            <div className='flex justify-between text-base mr-[64%] my-7'>
                                <p className='text-xl text-gray-500'>คงเหลือ</p>
                                <p className='text-xl '>{matchedProduct.quantity}</p>
                            </div>

                            <div className='flex justify-between text-base mr-[57.5%] my-7'>
                                <p className='text-xl text-gray-500'>จำนวน</p>
                                <div className="relative flex items-center max-w-[8rem] ">
                                    <button onClick={handleDecrement} className="bg-gray-100 p-3 h-11 rounded-s-lg">-</button>
                                    <input
                                        type="number"
                                        value={quantity}
                                        onChange={(e) => setQuantity(Number(e.target.value))}
                                        className="text-center w-full"
                                    />
                                    <button onClick={handleIncrement} className="bg-gray-100 p-3 h-11 rounded-e-lg">+</button>
                                </div>
                            </div>

                            <button
                                onClick={() => actionAddtoCartV2(matchedProduct, quantity)}
                                className="bg-lime-500 rounded-3xl px-5 py-3 hover:bg-lime-600 shadow-md ">
                                <div className='flex my-1'>
                                    <p>เพิ่มลงในตะกร้า</p>
                                    <ShoppingCart />
                                </div>
                            </button>
                        </div>
                    </div>


                    <hr className='border-black' />

                    <div className='bg-white'>
                        <h1 className='text-2xl mx-6'>รายละเอียดสินค้า</h1>
                        <h1 className='text-lg mx-6 ml-16'>{matchedProduct.description}</h1>
                    </div>
                </div>
            ) : (
                <p>ไม่พบสินค้าที่ตรงกับ ID {foundNumber}</p>
            )}
        </div>
    );
};

export default Detail;
