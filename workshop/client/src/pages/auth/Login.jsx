import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import useEcomStore from '../../store/ecom-store';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login'
import { gapi } from 'gapi-script'



const Login = () => {

  const clientId = "903808923973-3o9ugl6tf03i3psofsnqlhgbhn046hrc.apps.googleusercontent.com"

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: ''
      })
    }
    gapi.load("client:auth2", initClient)
  })

  const onSuccess = async (res) => {
    const idToken = res.tokenId;  // รับ idToken จาก Google
    try {
      // เรียกใช้ actionSignInGoogle จาก Zustand store
      const googleSignInResponse = await actionSignInGoogle(idToken);

      // ตรวจสอบว่าเข้าสู่ระบบสำเร็จหรือไม่
      if (googleSignInResponse) {
        console.log('Google Sign-In Success:', googleSignInResponse.data);
        //toast.success('เข้าสู่ระบบด้วย Google สำเร็จ');
        navigate('/');  // หรือ redirect ไปหน้า dashboard หรือหน้าอื่นๆ
      }
    } catch (err) {
      console.log('Google Sign-In failed', err);
      toast.error('เข้าสู่ระบบด้วย Google ล้มเหลว');
    }
  };

  const onFailure = (res) => {
    console.log('Google Sign-In Failed:', res);
    toast.error('การเข้าสู่ระบบล้มเหลว');
  };
  

  //Javascript
  const navigate = useNavigate()
  const actionLogin = useEcomStore((state) => state.actionLogin)
  const actionSignInGoogle = useEcomStore((state) => state.actionSignInGoogle)
  const user = useEcomStore((state) => state.user)
  //console.log('user form zustand', user)


  const [form, setForm] = useState({
    email: "",
    password: "",
  })


  const handleOnChange = (e) => {
    //console.log(e.target.name,e.target.value)
    setForm({
      //ใช้ 3 จุดคัดลอก object ชื่อ form มาใช้
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await actionLogin(form)
      const role = res.data.payload.role
      roleRedirect(role)
      //toast.success('Welcome Back')
    } catch (err) {
      console.log(err)
      const errMsg = err.response?.data?.message
      toast.error(errMsg)
    }
  }

  const roleRedirect = (role) => {
    if (role === 'admin') {
      navigate('/admin')
    } else {
      navigate(-1)
    }
  }

  return (

    //HTML,CSS
    //<div>
    //  Login
    //  <form onSubmit={handleSubmit}>

    //    Email
    //    <input className='border'
    //      onChange={handleOnChange}
    //      name='email'
    //      type='email'
    //    />

    //    Password
    //    <input className='border'
    //      onChange={handleOnChange}
    //      name='password'
    //      type='text'
    //    />

    //    <button className='bg-blue-500 rounded-md'>
    //      Login
    //    </button>

    //  </form>
    //</div>

    //w-6/12
    <div className="flex h-[98vh] bg-white ">
      <div className="w-6/12 h-[100%]">
        <img src="https://phuket.house/wp-content/uploads/2021/12/Japanese-minimalist-house4.jpg" alt="login background" className='w-full h-full object-cover my-2'/>
      </div>
      <div className="w-2/4 flex flex-col justify-center items-center text-center px-12 ">
        <p className='text-5xl font-bold my-9'>ลงชื่อเข้าสู่ระบบ</p>

        <form onSubmit={handleSubmit} >
          <input className='text-2xl pt-2 pr-96 pb-2 pl-3 my-2 border-2 border-gray-400 focus:outline-none focus:ring-2 focus:border-blue-500 rounded-lg ' onChange={handleOnChange} name='email' type='email' placeholder="อีเมลผู้ใช้" />
          <input className='text-2xl pt-2 pr-96 pb-2 pl-3 my-2 border-2 border-gray-400 focus:outline-none focus:ring-2 focus:border-blue-500 rounded-lg ' onChange={handleOnChange} name='password' type="text" placeholder="รหัสผ่าน" />
          {/* <div className='text-end m-3 text-xl text-[#54980F]'>
            <a href="/" >ลืมรหัสผ่าน?</a>
          </div> */}

          <div className='text-center'>
            <button type="submit" className='font-bold text-center w-3/5 bg-[#54980F] text-white p-2.5 rounded-md text-lg cursor-pointer mb-5 mt-5 transition duration-300 ease-in-out shadow-md hover:shadow-lg hover:bg-[#4a870e] '>
              เข้าสู่ระบบ
            </button>
          </div>
        </form>


        <p className='Or'><span>หรือ</span></p>


        <GoogleLogin
          clientId={clientId}
          render={(renderprompt) => (
            <button
              onClick={renderprompt.onClick}
              disabled={renderprompt.disabled}
              className="cursor-pointer transition duration-300 ease-in-out w-2/5 mb-7 py-4 px-10 
              pl-11 
              rounded 
              shadow-md 
              text-gray-600 
              text-lg 
              font-medium 
              bg-white 
              bg-no-repeat 
              bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTcuNiA5LjJsLS4xLTEuOEg5djMuNGg0LjhDMTMuNiAxMiAxMyAxMyAxMiAxMy42djIuMmgzYTguOCA4LjggMCAwIDAgMi42LTYuNnoiIGZpbGw9IiM0Mjg1RjQiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxwYXRoIGQ9Ik05IDE4YzIuNCAwIDQuNS0uOCA2LTIuMmwtMy0yLjJhNS40IDUuNCAwIDAgMS04LTIuOUgxVjEzYTkgOSAwIDAgMCA4IDV6IiBmaWxsPSIjMzRBODUzIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNNCAxMC43YTUuNCA1LjQgMCAwIDEgMC0zLjRWNUgxYTkgOSAwIDAgMCAwIDhsMy0yLjN6IiBmaWxsPSIjRkJCQzA1IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNOSAzLjZjMS4zIDAgMi41LjQgMy40IDEuM0wxNSAyLjNBOSA5IDAgMCAwIDEgNWwzIDIuNGE1LjQgNS40IDAgMCAxIDUtMy43eiIgZmlsbD0iI0VBNDMzNSIgZmlsbC1ydWxlPSJub256ZXJvIi8+PHBhdGggZD0iTTAgMGgxOHYxOEgweiIvPjwvZz48L3N2Zz4=')]
              bg-[length:35px]
              bg-[position:20px_15px]
              hover:shadow-lg
              active:bg-gray-200 
              active:outline-none 
              active:shadow-[0_-1px_0_rgba(0,0,0,0.04),0_2px_4px_rgba(0,0,0,0.25),0_0_0_3px_#c8dafc"
            >
              Sign in with Google
            </button>
          )}
          buttonText="Sign in with Google"
          className='my-3'
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
          isSignedIn={true}

        />


        {/* <button className="cursor-pointer transition duration-300 ease-in-out w-2/5 mb-7 py-4 px-10 
              pl-11 
              rounded 
              shadow-md 
              text-gray-600 
              text-lg 
              font-medium 
              bg-white 
              bg-no-repeat 
              bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTcuNiA5LjJsLS4xLTEuOEg5djMuNGg0LjhDMTMuNiAxMiAxMyAxMyAxMiAxMy42djIuMmgzYTguOCA4LjggMCAwIDAgMi42LTYuNnoiIGZpbGw9IiM0Mjg1RjQiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxwYXRoIGQ9Ik05IDE4YzIuNCAwIDQuNS0uOCA2LTIuMmwtMy0yLjJhNS40IDUuNCAwIDAgMS04LTIuOUgxVjEzYTkgOSAwIDAgMCA4IDV6IiBmaWxsPSIjMzRBODUzIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNNCAxMC43YTUuNCA1LjQgMCAwIDEgMC0zLjRWNUgxYTkgOSAwIDAgMCAwIDhsMy0yLjN6IiBmaWxsPSIjRkJCQzA1IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNOSAzLjZjMS4zIDAgMi41LjQgMy40IDEuM0wxNSAyLjNBOSA5IDAgMCAwIDEgNWwzIDIuNGE1LjQgNS40IDAgMCAxIDUtMy43eiIgZmlsbD0iI0VBNDMzNSIgZmlsbC1ydWxlPSJub256ZXJvIi8+PHBhdGggZD0iTTAgMGgxOHYxOEgweiIvPjwvZz48L3N2Zz4=')]
              bg-[length:35px]
              bg-[position:20px_15px]
              hover:shadow-lg
              active:bg-gray-200 
              active:outline-none 
              active:shadow-[0_-1px_0_rgba(0,0,0,0.04),0_2px_4px_rgba(0,0,0,0.25),0_0_0_3px_#c8dafc]
            ">
          Sign in with Google
        </button> */}



        {/* <button className="cursor-pointer transition duration-300 ease-in-out w-2/5 mb-7 py-4 px-10 
              pl-11 
              rounded 
              shadow-md 
              text-gray-600 
              text-lg 
              font-medium 
              bg-white 
              bg-no-repeat 
              bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/480px-Facebook_Logo_%282019%29.png')]
              bg-[length:35px]
              bg-[position:20px_15px]
              hover:shadow-lg
              active:bg-gray-200 
              active:outline-none 
              active:shadow-[0_-1px_0_rgba(0,0,0,0.04),0_2px_4px_rgba(0,0,0,0.25),0_0_0_3px_#c8dafc]
            ">
          Sign in with Facebook
        </button> */}

        <p className='mt-5 text-xl'>
          หากยังไม่มีบัญชี? <a href="/register" className='text-[#54980F] no-underline hover:underline'>สมัครสมาชิก</a>
        </p>
      </div>
    </div>
  )
}

export default Login