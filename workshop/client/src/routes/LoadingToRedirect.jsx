import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';

//หน้านี้จะเขียนหรือไม่ ก็ได้

const LoadingToRedirect = () => {
    const [count, setCount] = useState(3)
    const [redirect, setRedirect] = useState(false)

    useEffect(() => {
        //การจับเวลา
        const interval = setInterval(() => {
            setCount((currentCount) => {
                //เมื่อใดที่มีค่า -1 ก็จะสั่งหยุดการทำงาน interval 
                if (currentCount === 1) {
                    clearInterval(interval)
                    setRedirect(true)
                }
                return currentCount - 1
            })
            
        }, 1000) //ทำงานทุกๆ 1000 = 1 วินาที

        return ()=> clearInterval(interval)
    }, [])

    if(redirect) {
        return <Navigate to={'/'} />
    }

    return (
        <div>No Permission, Redirect in {count}</div>
    )
}

export default LoadingToRedirect