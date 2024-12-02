import React, { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import axios from 'axios';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Navigation, Autoplay } from 'swiper/modules';



const ContentCarousel = () => {
    // Javascript

    const [data, setData] = useState([]);

    useEffect(() => {
        hdlGetImage()
    }, [])

    const hdlGetImage = () => {
        // code
        axios.get('https://picsum.photos/v2/list?page=1&limit=20')
            .then((res) =>
                setData(res.data)
            )
            .catch((err) =>
                console.log(err)
            )
    }

    return (
        <div className='mx-20'>
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                pagination={{
                    clickable: true,
                }}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false
                }}
                navigation={true}
                modules={[Pagination, Navigation, Autoplay]}
                className="mySwiper h-[500px] w-full object-cover rounded-md "
            >
                {
                    data?.map((item, index) =>
                        <SwiperSlide key={index}>
                            <img src={item.download_url} />
                        </SwiperSlide>
                    )
                }


            </Swiper>
        </div>
    )
}

export default ContentCarousel