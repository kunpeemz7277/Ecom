import React, { useEffect } from 'react'
import { ShoppingCart } from 'lucide-react';
import ContentCarousel from '../components/home/ContentCarousel';
import BestSeller from '../components/home/BestSeller';
import NewProduct from '../components/home/NewProduct';
import useEcomStore from '../store/ecom-store'

const Home = () => {
  const getProduct = useEcomStore((state) => state.getProduct)
  const products = useEcomStore((state) => state.products)

  useEffect(() => {
    getProduct()
  }, [])

  return (
    <div>
      <ContentCarousel />

      <p className='text-2xl text-center my-4'>สินค้าขายดี</p>
      <BestSeller />

      <p className='text-2xl text-center my-4'>สินค้าใหม่</p>
      <NewProduct />


      {/* <div className="relative bg-gray-100">
        <img src="https://cdn.prod.website-files.com/61c1522cd03553569e619b01/6413f03701daeb77dee55206_Look%20After%20-%205%20%E0%B8%95%E0%B9%89%E0%B8%99%E0%B9%84%E0%B8%A1%E0%B9%89%E0%B8%9F%E0%B8%AD%E0%B8%81%E0%B8%AD%E0%B8%B2%E0%B8%81%E0%B8%B2%E0%B8%A8%E0%B9%83%E0%B8%99%E0%B8%AB%E0%B9%89%E0%B8%AD%E0%B8%87%E0%B8%99%E0%B8%AD%E0%B8%99%20%E0%B8%9B%E0%B8%A5%E0%B8%B9%E0%B8%81%E0%B9%83%E0%B8%99%E0%B8%AB%E0%B9%89%E0%B8%AD%E0%B8%87%E0%B8%99%E0%B8%AD%E0%B8%99%20%E0%B8%AA%E0%B8%B8%E0%B8%82%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%94%E0%B8%B5%E0%B8%82%E0%B8%B6%E0%B9%89%E0%B8%99-01.jpg" class="w-full h-1/4 object-cover" />



      </div> */}


      {/* <div class="flex flex-wrap gap-10 mx-40">

        <div class="flex-1 relative bg-gray-200 h-[600px] mx-24 shadow-xl">
          <img src="https://cdn.prod.website-files.com/61c1522cd03553569e619b01/6413f03701daeb77dee55206_Look%20After%20-%205%20%E0%B8%95%E0%B9%89%E0%B8%99%E0%B9%84%E0%B8%A1%E0%B9%89%E0%B8%9F%E0%B8%AD%E0%B8%81%E0%B8%AD%E0%B8%B2%E0%B8%81%E0%B8%B2%E0%B8%A8%E0%B9%83%E0%B8%99%E0%B8%AB%E0%B9%89%E0%B8%AD%E0%B8%87%E0%B8%99%E0%B8%AD%E0%B8%99%20%E0%B8%9B%E0%B8%A5%E0%B8%B9%E0%B8%81%E0%B9%83%E0%B8%99%E0%B8%AB%E0%B9%89%E0%B8%AD%E0%B8%87%E0%B8%99%E0%B8%AD%E0%B8%99%20%E0%B8%AA%E0%B8%B8%E0%B8%82%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%94%E0%B8%B5%E0%B8%82%E0%B8%B6%E0%B9%89%E0%B8%99-01.jpg" alt="Main Banner" class="w-[800px] h-full object-cover " />
          <div class="absolute top-1/4 left-10 text-white">
            <p class="text-sm font-light text-gray-600">Late Summer Edition</p>
            <h1 class="text-4xl font-bold mt-1 text-gray-800">New Summer Arrivals</h1>
            <p class="text-lg font-medium mt-2 text-orange-500">Get <span class="font-bold">40% Off</span></p>
            <button class="bg-orange-500 text-white font-semibold py-2 px-4 mt-4 rounded">Shop Now</button>
          </div>
        </div>


        <div class="flex flex-col gap-4 w-1/3 ">

          <div class="relative bg-gray-200 right-28">
            <img src="https://cdn.prod.website-files.com/61c1522cd03553569e619b01/6413f03701daeb77dee55206_Look%20After%20-%205%20%E0%B8%95%E0%B9%89%E0%B8%99%E0%B9%84%E0%B8%A1%E0%B9%89%E0%B8%9F%E0%B8%AD%E0%B8%81%E0%B8%AD%E0%B8%B2%E0%B8%81%E0%B8%B2%E0%B8%A8%E0%B9%83%E0%B8%99%E0%B8%AB%E0%B9%89%E0%B8%AD%E0%B8%87%E0%B8%99%E0%B8%AD%E0%B8%99%20%E0%B8%9B%E0%B8%A5%E0%B8%B9%E0%B8%81%E0%B9%83%E0%B8%99%E0%B8%AB%E0%B9%89%E0%B8%AD%E0%B8%87%E0%B8%99%E0%B8%AD%E0%B8%99%20%E0%B8%AA%E0%B8%B8%E0%B8%82%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%94%E0%B8%B5%E0%B8%82%E0%B8%B6%E0%B9%89%E0%B8%99-01.jpg" alt="Blazer" class="w-full h-full object-cover " />
            <div class="absolute bottom-4 left-4 bg-orange-500 text-white px-2 py-1 rounded font-semibold">30% Off</div>
            <div class="absolute bottom-4 right-4 text-white font-bold">Skinny Fit Blazer</div>
          </div>

          <div class="relative bg-gray-200 right-28">
            <img src="https://cdn.prod.website-files.com/61c1522cd03553569e619b01/6413f03701daeb77dee55206_Look%20After%20-%205%20%E0%B8%95%E0%B9%89%E0%B8%99%E0%B9%84%E0%B8%A1%E0%B9%89%E0%B8%9F%E0%B8%AD%E0%B8%81%E0%B8%AD%E0%B8%B2%E0%B8%81%E0%B8%B2%E0%B8%A8%E0%B9%83%E0%B8%99%E0%B8%AB%E0%B9%89%E0%B8%AD%E0%B8%87%E0%B8%99%E0%B8%AD%E0%B8%99%20%E0%B8%9B%E0%B8%A5%E0%B8%B9%E0%B8%81%E0%B9%83%E0%B8%99%E0%B8%AB%E0%B9%89%E0%B8%AD%E0%B8%87%E0%B8%99%E0%B8%AD%E0%B8%99%20%E0%B8%AA%E0%B8%B8%E0%B8%82%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%94%E0%B8%B5%E0%B8%82%E0%B8%B6%E0%B9%89%E0%B8%99-01.jpg" alt="Family Sweater" class="w-full h-full object-cover " />
            <div class="absolute bottom-4 left-4 bg-orange-500 text-white px-2 py-1 rounded font-semibold">30% Off</div>
            <div class="absolute bottom-4 right-4 text-white font-bold">Family Sweater</div>
          </div>
        </div>
      </div> */}

      {/* สวยงาม, เรียบง่าย สไตล์ Treez*/}
      {/* <div className='flex mt-10'>
        <img src="https://cdn.prod.website-files.com/61c1522cd03553569e619b01/6413f03701daeb77dee55206_Look%20After%20-%205%20%E0%B8%95%E0%B9%89%E0%B8%99%E0%B9%84%E0%B8%A1%E0%B9%89%E0%B8%9F%E0%B8%AD%E0%B8%81%E0%B8%AD%E0%B8%B2%E0%B8%81%E0%B8%B2%E0%B8%A8%E0%B9%83%E0%B8%99%E0%B8%AB%E0%B9%89%E0%B8%AD%E0%B8%87%E0%B8%99%E0%B8%AD%E0%B8%99%20%E0%B8%9B%E0%B8%A5%E0%B8%B9%E0%B8%81%E0%B9%83%E0%B8%99%E0%B8%AB%E0%B9%89%E0%B8%AD%E0%B8%87%E0%B8%99%E0%B8%AD%E0%B8%99%20%E0%B8%AA%E0%B8%B8%E0%B8%82%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%94%E0%B8%B5%E0%B8%82%E0%B8%B6%E0%B9%89%E0%B8%99-01.jpg" class="w-full h-1/4 object-cover" />
        <div className='bg-gray-300 absolute container mt-48 ml-5 w-[800px] h-[500px] bg-opacity-80 '>

          <div className='flex flex-wrap'>
            <p className='ml-5 mt-5 text-3xl font-medium'>มีต้นไม้จัดสรร</p>
            <p className='ml-2 mt-4 text-4xl font-medium text-[#D4643B]'>เน้นสวยงาม, ดูแลง่าย สไตล์มินิมอล</p>
            <h1 className='ml-5 mt-5 text-6xl font-bold'>สวยงาม, เรียบง่าย <br /> สไตล์ Treez </h1>
            <p className='ml-7 mt-5 text-3xl font-medium'>ในแบบที่ท่านต้องการ <br /> โดยทีมงานมืออาชีพ........</p>
          </div>

          <button className='ml-7 mt-20 py-5 px-10 bg-black text-2xl text-white  font-bold hover:-translate-y-2 duration-300 hover:shadow-xl'>ติดต่อเรา</button>
        </div>
      </div> */}


      {/* ไอเดียแต่งบ้าน */}
      {/* <div className='my-10'>

        <h1 class="text-3xl font-bold text-center">ไอเดียแต่งบ้าน</h1>
        <p class="text-2xl font-medium mt-2 text-center">รวบรวมไอเดียที่อาจจะเป็นประโยชน์สำหรับทุกท่าน</p>

        <div class="grid grid-cols-3 gap-10 mt-8 mx-24 my-10">
          <div className='border hover:-translate-y-2 duration-300 hover:shadow-xl'>
            <img src="https://cdn.prod.website-files.com/61c1522cd03553569e619b01/6413f03701daeb77dee55206_Look%20After%20-%205%20%E0%B8%95%E0%B9%89%E0%B8%99%E0%B9%84%E0%B8%A1%E0%B9%89%E0%B8%9F%E0%B8%AD%E0%B8%81%E0%B8%AD%E0%B8%B2%E0%B8%81%E0%B8%B2%E0%B8%A8%E0%B9%83%E0%B8%99%E0%B8%AB%E0%B9%89%E0%B8%AD%E0%B8%87%E0%B8%99%E0%B8%AD%E0%B8%99%20%E0%B8%9B%E0%B8%A5%E0%B8%B9%E0%B8%81%E0%B9%83%E0%B8%99%E0%B8%AB%E0%B9%89%E0%B8%AD%E0%B8%87%E0%B8%99%E0%B8%AD%E0%B8%99%20%E0%B8%AA%E0%B8%B8%E0%B8%82%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%94%E0%B8%B5%E0%B8%82%E0%B8%B6%E0%B9%89%E0%B8%99-01.jpg" class="w-full h-full" />
          </div>

          <div className='border hover:-translate-y-2 duration-300 hover:shadow-xl'>
            <img src="https://cdn.prod.website-files.com/61c1522cd03553569e619b01/6413f03701daeb77dee55206_Look%20After%20-%205%20%E0%B8%95%E0%B9%89%E0%B8%99%E0%B9%84%E0%B8%A1%E0%B9%89%E0%B8%9F%E0%B8%AD%E0%B8%81%E0%B8%AD%E0%B8%B2%E0%B8%81%E0%B8%B2%E0%B8%A8%E0%B9%83%E0%B8%99%E0%B8%AB%E0%B9%89%E0%B8%AD%E0%B8%87%E0%B8%99%E0%B8%AD%E0%B8%99%20%E0%B8%9B%E0%B8%A5%E0%B8%B9%E0%B8%81%E0%B9%83%E0%B8%99%E0%B8%AB%E0%B9%89%E0%B8%AD%E0%B8%87%E0%B8%99%E0%B8%AD%E0%B8%99%20%E0%B8%AA%E0%B8%B8%E0%B8%82%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%94%E0%B8%B5%E0%B8%82%E0%B8%B6%E0%B9%89%E0%B8%99-01.jpg" class="w-full h-full" />
          </div>

          <div className='border hover:-translate-y-2 duration-300 hover:shadow-xl'>
            <img src="https://cdn.prod.website-files.com/61c1522cd03553569e619b01/6413f03701daeb77dee55206_Look%20After%20-%205%20%E0%B8%95%E0%B9%89%E0%B8%99%E0%B9%84%E0%B8%A1%E0%B9%89%E0%B8%9F%E0%B8%AD%E0%B8%81%E0%B8%AD%E0%B8%B2%E0%B8%81%E0%B8%B2%E0%B8%A8%E0%B9%83%E0%B8%99%E0%B8%AB%E0%B9%89%E0%B8%AD%E0%B8%87%E0%B8%99%E0%B8%AD%E0%B8%99%20%E0%B8%9B%E0%B8%A5%E0%B8%B9%E0%B8%81%E0%B9%83%E0%B8%99%E0%B8%AB%E0%B9%89%E0%B8%AD%E0%B8%87%E0%B8%99%E0%B8%AD%E0%B8%99%20%E0%B8%AA%E0%B8%B8%E0%B8%82%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%94%E0%B8%B5%E0%B8%82%E0%B8%B6%E0%B9%89%E0%B8%99-01.jpg" class="w-full h-full" />
          </div>

          <div className='border hover:-translate-y-2 duration-300 hover:shadow-xl'>
            <img src="https://cdn.prod.website-files.com/61c1522cd03553569e619b01/6413f03701daeb77dee55206_Look%20After%20-%205%20%E0%B8%95%E0%B9%89%E0%B8%99%E0%B9%84%E0%B8%A1%E0%B9%89%E0%B8%9F%E0%B8%AD%E0%B8%81%E0%B8%AD%E0%B8%B2%E0%B8%81%E0%B8%B2%E0%B8%A8%E0%B9%83%E0%B8%99%E0%B8%AB%E0%B9%89%E0%B8%AD%E0%B8%87%E0%B8%99%E0%B8%AD%E0%B8%99%20%E0%B8%9B%E0%B8%A5%E0%B8%B9%E0%B8%81%E0%B9%83%E0%B8%99%E0%B8%AB%E0%B9%89%E0%B8%AD%E0%B8%87%E0%B8%99%E0%B8%AD%E0%B8%99%20%E0%B8%AA%E0%B8%B8%E0%B8%82%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%94%E0%B8%B5%E0%B8%82%E0%B8%B6%E0%B9%89%E0%B8%99-01.jpg" class="w-full h-full" />
          </div>

          <div className='border hover:-translate-y-2 duration-300 hover:shadow-xl'>
            <img src="https://cdn.prod.website-files.com/61c1522cd03553569e619b01/6413f03701daeb77dee55206_Look%20After%20-%205%20%E0%B8%95%E0%B9%89%E0%B8%99%E0%B9%84%E0%B8%A1%E0%B9%89%E0%B8%9F%E0%B8%AD%E0%B8%81%E0%B8%AD%E0%B8%B2%E0%B8%81%E0%B8%B2%E0%B8%A8%E0%B9%83%E0%B8%99%E0%B8%AB%E0%B9%89%E0%B8%AD%E0%B8%87%E0%B8%99%E0%B8%AD%E0%B8%99%20%E0%B8%9B%E0%B8%A5%E0%B8%B9%E0%B8%81%E0%B9%83%E0%B8%99%E0%B8%AB%E0%B9%89%E0%B8%AD%E0%B8%87%E0%B8%99%E0%B8%AD%E0%B8%99%20%E0%B8%AA%E0%B8%B8%E0%B8%82%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%94%E0%B8%B5%E0%B8%82%E0%B8%B6%E0%B9%89%E0%B8%99-01.jpg" class="w-full h-full" />
          </div>

          <div className='border hover:-translate-y-2 duration-300 hover:shadow-xl'>
            <img src="https://cdn.prod.website-files.com/61c1522cd03553569e619b01/6413f03701daeb77dee55206_Look%20After%20-%205%20%E0%B8%95%E0%B9%89%E0%B8%99%E0%B9%84%E0%B8%A1%E0%B9%89%E0%B8%9F%E0%B8%AD%E0%B8%81%E0%B8%AD%E0%B8%B2%E0%B8%81%E0%B8%B2%E0%B8%A8%E0%B9%83%E0%B8%99%E0%B8%AB%E0%B9%89%E0%B8%AD%E0%B8%87%E0%B8%99%E0%B8%AD%E0%B8%99%20%E0%B8%9B%E0%B8%A5%E0%B8%B9%E0%B8%81%E0%B9%83%E0%B8%99%E0%B8%AB%E0%B9%89%E0%B8%AD%E0%B8%87%E0%B8%99%E0%B8%AD%E0%B8%99%20%E0%B8%AA%E0%B8%B8%E0%B8%82%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%94%E0%B8%B5%E0%B8%82%E0%B8%B6%E0%B9%89%E0%B8%99-01.jpg" class="w-full h-full" />
          </div>
        </div>


      </div> */}

      {/* สินค้าที่แนะนำ สร้างบรรยายกาศให้สดชื่น เพื่อให้ความทรงจำของคุณใหม่ตลอดไป */}
      {/* <div className='my-9 '>
        <h1 class="text-3xl font-bold text-center ">สินค้าที่แนะนำ</h1>
        <p class="text-2xl font-medium text-center mt-2">สร้างบรรยายกาศให้สดชื่น เพื่อให้ความทรงจำของคุณใหม่ตลอดไป</p>
      </div> */}

      {/* Flex 1 */}







    </div>
  )
}

export default Home

