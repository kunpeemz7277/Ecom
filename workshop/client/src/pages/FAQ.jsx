import React from 'react';
import ReactPaginate from 'react-paginate';

const FAQ = () => {
  
  return (
    <div>
      <div className="bg-gray-200 py-5">
        <p className="text-4xl font-bold text-center my-5">คำถามที่พบบ่อย</p>
        <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-5 mx-10 justify-center">
          {/* Card เริ่ม */}
          <div className=" rounded-lg overflow-hidden w-[300px] h-[300px] ">
            <div className="w-full h-[60%] hover:-translate-y-1 duration-300">
              <img
                className="w-full h-[150%] object-cover hover:shadow-md "
                src="https://res.cloudinary.com/delkcrdzn/image/upload/v1731658924/Ecom2024/Treez-1731658921558.jpg"
                alt="ต้นลิ้นมังกร"
              />
              <h2 className="text-center font-bold text-lg">วิธีการดูแลต้นลิ้นมังกร</h2>
            </div>
          </div>
          {/* Card จบ */}

          {/* Card เริ่ม */}
          <div className=" rounded-lg overflow-hidden w-[300px] h-[300px] ">
            <div className="w-full h-[60%] hover:-translate-y-1 duration-300">
              <img
                className="w-full h-[150%] object-cover hover:shadow-md "
                src="https://res.cloudinary.com/delkcrdzn/image/upload/v1731658924/Ecom2024/Treez-1731658921558.jpg"
                alt="ต้นลิ้นมังกร"
              />
              <h2 className="text-center font-bold text-lg">วิธีการดูแลต้นลิ้นมังกร</h2>
            </div>
          </div>
          {/* Card จบ */}

          {/* Card เริ่ม */}
          <div className=" rounded-lg overflow-hidden w-[300px] h-[300px] ">
            <div className="w-full h-[60%] hover:-translate-y-1 duration-300">
              <img
                className="w-full h-[150%] object-cover hover:shadow-md "
                src="https://res.cloudinary.com/delkcrdzn/image/upload/v1731658924/Ecom2024/Treez-1731658921558.jpg"
                alt="ต้นลิ้นมังกร"
              />
              <h2 className="text-center font-bold text-lg">วิธีการดูแลต้นลิ้นมังกร</h2>
            </div>
          </div>
          {/* Card จบ */}

          {/* Card เริ่ม */}
          <div className=" rounded-lg overflow-hidden w-[300px] h-[300px] ">
            <div className="w-full h-[60%] hover:-translate-y-1 duration-300">
              <img
                className="w-full h-[150%] object-cover hover:shadow-md "
                src="https://res.cloudinary.com/delkcrdzn/image/upload/v1731658924/Ecom2024/Treez-1731658921558.jpg"
                alt="ต้นลิ้นมังกร"
              />
              <h2 className="text-center font-bold text-lg">วิธีการดูแลต้นลิ้นมังกร</h2>
            </div>
          </div>
          {/* Card จบ */}

          {/* Card เริ่ม */}
          <div className=" rounded-lg overflow-hidden w-[300px] h-[300px] ">
            <div className="w-full h-[60%] hover:-translate-y-1 duration-300">
              <img
                className="w-full h-[150%] object-cover hover:shadow-md "
                src="https://res.cloudinary.com/delkcrdzn/image/upload/v1731658924/Ecom2024/Treez-1731658921558.jpg"
                alt="ต้นลิ้นมังกร"
              />
              <h2 className="text-center font-bold text-lg">วิธีการดูแลต้นลิ้นมังกร</h2>
            </div>
          </div>
          {/* Card จบ */}

          {/* Card เริ่ม */}
          <div className=" rounded-lg overflow-hidden w-[300px] h-[300px] ">
            <div className="w-full h-[60%] hover:-translate-y-1 duration-300">
              <img
                className="w-full h-[150%] object-cover hover:shadow-md "
                src="https://res.cloudinary.com/delkcrdzn/image/upload/v1731658924/Ecom2024/Treez-1731658921558.jpg"
                alt="ต้นลิ้นมังกร"
              />
              <h2 className="text-center font-bold text-lg">วิธีการดูแลต้นลิ้นมังกร</h2>
            </div>
          </div>
          {/* Card จบ */}

          
        </div>
      </div>

      <div className="bg-gray-200 py-10 my-6 text-center">
        <p className="text-3xl font-bold">สอบถามข้อมูลเพิ่มเติมได้ที่</p>
        <div className="flex justify-center items-center my-2 space-x-2">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1024px-Facebook_Logo_%282019%29.png"
            className="w-8 h-8 object-contain"
            alt="Facebook Logo"
          />
          <p className="text-2xl font-bold">Facebook : Treez ร้านขายต้นไม้ออนไลน์สไตล์มินิมอล</p>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
