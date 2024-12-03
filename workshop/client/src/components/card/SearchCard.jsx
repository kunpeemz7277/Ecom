import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import useEcomStore from '../../store/ecom-store'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const SearchCard = () => {
    const getProduct = useEcomStore((state) => state.getProduct)
    const products = useEcomStore((state) => state.products)
    const actionSearchFilters = useEcomStore((state) => state.actionSearchFilters)

    const location = useLocation();

    const getCategory = useEcomStore((state) => state.getCategory)
    const categories = useEcomStore((state) => state.categories)

    const [text, setText] = useState('')

    const [categorySelected, setCategorySelected] = useState([])

    const [minprice, setMinPrice,] = useState(50)
    const [maxprice, setMaxPrice,] = useState(500)

    //const Avgprice = [parseInt(minprice, 10), parseInt(maxprice, 10)]
    //console.log(Avgprice)

    const Minprice = (parseInt(minprice, 10))
    const Maxprice = (parseInt(maxprice, 10))


    //const Avgprice = [minprice, maxprice]
    //const Avgprice = [Minprice, Maxprice]
    //console.log(Avgprice)


    const [price, setPrice] = useState([Minprice, Maxprice])
    const [ok, setOk] = useState(false)

    //const [filteredProducts, setFilteredProducts] = useState(products);

    //console.log(categories)
    useEffect(() => {
        getCategory()
    }, [])




    // Step 1 Search Text
    //console.log(text)
    useEffect(() => {
        //code
        const delay = setTimeout(() => {


            if (text) {
                actionSearchFilters({ query: text })
            } else {
                getProduct()
            }
        }, 300)

        return () => clearTimeout(delay)
    }, [text])



    // Step 2 Search by Category
    const handleCheck = (e) => {
        //console.log(e.target.value)
        const inCheck = e.target.value  // ค่าที่เรา check
        const inState = [...categorySelected] //..[]
        const findCheck = inState.indexOf(inCheck) // ถ้าไม่เจอจะ return -1

        if (findCheck === -1) {
            inState.push(inCheck)
        } else {
            inState.splice(findCheck, 1)
        }
        setCategorySelected(inState)


        if (inState.length > 0) {
            actionSearchFilters({ category: inState })
        } else {
            getProduct()
        }
    }

    //console.log(categorySelected);

    // useEffect(() => {
    //     //code
    //     const delay = setTimeout(() => {
    //         if (Avgprice) {
    //             actionSearchFilters({ price : Avgprice })
    //         } else {
    //             getProduct()
    //         }
    //     }, 300)

    //     return () => clearTimeout(delay)
    // }, [Avgprice])

    useEffect(() => {
        const selectedCategory = location.state?.selectedCategory;
        if (selectedCategory) {
            setCategorySelected([selectedCategory]);
        }
    }, [location.state]);

    // Step 3 Search by Price
    useEffect(() => {
        actionSearchFilters({ price })
    }, [ok])
    const handlePrice = (value) => {
        console.log(value);
        setPrice(value);

        setTimeout(() => {
            setOk(!ok);
        }, 300);
    };

    // const handlePrice = ([Minprice,Maxprice]) => {
    //     console.log([Minprice,Maxprice])
    //     setPrice([Minprice,Maxprice])
    //     setTimeout(() => {
    //         setOk(!ok)
    //     }, 300)
    // }
    ////////////////////////////////////////////////////

    const handlePriceFilter = () => {
        if (!isNaN(Minprice) && !isNaN(Maxprice) && Minprice <= Maxprice) {
            actionSearchFilters({ price: [Minprice, Maxprice] });
            //setFilteredProducts(products.filter((product) => product.price >= Minprice && product.price <= Maxprice));  // Filter products
        } else {
            alert("กรุณากรอกช่วงราคาที่ถูกต้อง");
        }
    };

    //console.log(handlePriceFilter);

    // useEffect(() => {
    //     actionSearchFilters({ price : [Minprice,Maxprice]})
    // }, [ok])
    // const handleMinPrice = (value) => {
    //     console.log(value)
    //     // setPrice(value)
    //     // setTimeout(() => {
    //     //     setOk(!ok)
    //     // }, 300)
    // }




    return (
        <div>
            <h1 className='text-xl font-bold mb-4'>ค้นหาสินค้า</h1>

            {/* Search by Text*/}
            <input
                onChange={(e) => setText(e.target.value)}
                type='text'
                placeholder='ค้นหาสินค้า'
                className='border rounded-md w-full mb-4 px-2 py-2'
            />
            <hr />
            {/* Search by Categoty*/}
            <div>
                <h1 className='text-lg font-b'>หมวดหมู่สินค้า</h1>
                <div>
                    {
                        categories.map((item, index) =>
                            <div className='flex gap-2' key={index}>
                                <input
                                    onChange={handleCheck}
                                    type="checkbox"
                                    value={item.id}
                                    //checked={categorySelected.includes(item.name)}
                                />
                                <label>{item.name}</label>
                            </div>
                        )
                    }
                </div>
            </div>

            <hr />

            {/* Search by Price */}
            <div className='py-2'>
                <h1 className='text-lg font-bold'>ค้นหาราคา</h1>
                <div>
                    <div className='flex justify-between text-base'>
                        <span>ต่ำสุด : {price[0]}</span>
                        <span>สูงสุด : {price[1]}</span>
                    </div>


                    <Slider
                        onChange={handlePrice}
                        range
                        min={0}
                        max={1000}
                        defaultValue={[50, 500]}
                    />
                </div>
            </div>


            <div className='flex py-2 gap-12'>
                <div className='ml-5'>
                    <input
                        onChange={(e) => setMinPrice(e.target.value)}
                        type='number'
                        placeholder='ราคาต่ำสุด'
                        className='border rounded-md w-36 mb-4 px-2 py-2'
                    />
                </div>
                <p className='font-bold text-3xl'>-</p>
                <div>
                    <input
                        onChange={(e) => setMaxPrice(e.target.value)}
                        type='number'
                        placeholder='ราคาสูงสุด'
                        className='border rounded-md w-36 mb-4 px-2 py-2'
                    />
                </div>
            </div>

            <button
                onClick={handlePriceFilter}
                className=' bg-gray-400 hover:bg-gray-500 text-white w-full py-2 rounded-md shadow-md'>
                ค้นหาราคา
            </button>

        </div>
    )
}

export default SearchCard