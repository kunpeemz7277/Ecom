import React, { useState } from 'react'
import { toast } from 'react-toastify'
import Resize from "react-image-file-resizer";
import { removeFiles, uploadFiles } from '../../api/product';
import useEcomStore from '../../store/ecom-store';
import { LoaderCircle } from 'lucide-react';


const Uploadfile = ({ form, setForm }) => {

    //Javascript
    const token = useEcomStore((state) => state.token)
    const [isLoading, setIsLoading] = useState(false)

    const handleOnChange = (e) => {
        //code
        setIsLoading(true)
        const files = e.target.files
        if (files) {
            //ถ้ามีไฟล์
            setIsLoading(true)
            let allFiles = form.images //[] empty array
            for (let i = 0; i < files.length; i++) {
                //console.log(files[i])

                //Validate
                const file = files[i]
                //ถ้าไฟล์รูปไม่ใช้ image จะข้ามไปตรวจไฟล์อื่นโดยไม่หยุดการทำงาน = ตรวจสอบไฟล์ทั้งหมด
                if (!file.type.startsWith('image/')) {
                    toast.error(`File ${file.name} is Not image`)
                    continue
                }
                //Image Resize 
                Resize.imageFileResizer(
                    files[i],
                    720,
                    720,
                    "JPEG",
                    100,
                    0,
                    (data) => {
                        //endpoint Backend function
                        console.log('data', data)

                        uploadFiles(token, data)
                            .then((res) => {
                                console.log(res)
                                allFiles.push(res.data)
                                setForm({
                                    ...form,
                                    images: allFiles
                                })
                                setIsLoading(false)
                                toast.success('Upload image Success!!!')
                            }).catch((err) => {
                                console.log(err)
                                setIsLoading(false)
                            })
                    },
                    "base64"
                )

            }
        }


    }
    console.log(form)

    const handleDelete = (public_id) => {
        const images = form.images
        removeFiles(token, public_id)
            .then((res) => {
                const filterImages = images.filter((items) => {
                    console.log(items)
                    return items.public_id !== public_id
                })
                console.log('filterImages', filterImages)
                setForm({
                    ...form,
                    images: filterImages
                })
                toast.error(res.data)
            })
            .catch((err) => {
                console.log(err)

            })
    }

    return (
        <div className='my-4'>
            <div className='flex mx-4 gap-4 my-4'>
                {
                    //ถ้าข้างหน้าเป็น false คือ จบ แต่ถ้าเป็น true จะทำหลัง and 
                    isLoading && <LoaderCircle className='w-16 h-16 animate-spin'/>
                }
                
                {/* Image */}
                {
                    //map คือ array method เอาไว้ loop แต่ละ element
                    form.images.map((items, index) =>
                        <div className='relative' key={index}>
                            <img
                                //แสดงรูปหลังจากอัพโหลดสำเร็จ
                                className='w-44 h-40 hover:scale-105'
                                src={items.url} />

                            <span
                                onClick={() => handleDelete(items.public_id)}
                                className='absolute top-0 right-0 bg-red-500 p-1 rounded'>X</span>

                        </div>
                    )
                }

            </div>

            <div>
                <input
                    onChange={handleOnChange}
                    type='file'
                    name='images'
                    multiple
                />
            </div>

        </div >
    )
}

export default Uploadfile