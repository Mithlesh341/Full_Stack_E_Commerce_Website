import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios.js';
import SummaryApi from '../common/SummaryApi.js';
import AxiosToastError from '../utils/AxiosToastError';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {

  const [data, setData] = useState({
    email : ""
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
     const {name, value} = e.target

     setData((prev)=>{
        return{
          ...prev,
          [name] : value
        }
     })
  }

  const validValue = Object.values(data).every(el => el)

  const handleSubmit = async(e) => {
      e.preventDefault()

      // if(data.password !== data.confirmPassword){
      //      toast.error(
      //         "Password and confirm password must be same"
      //      )
      //      return
      // }

      // const response = await Axios({
      //     ...SummaryApi.register,
      //     data : data
      // })

      try {
          const response = await Axios({
                ...SummaryApi.forgot_password,
                data : data
          })

          if(response.data.error){
            toast.error(response.data.message)
          }

          if(response.data.success){
            toast.success(response.data.message)
            navigate("/verification-otp",{
              state : data
            })
            setData({
              email : ""

            })

          }
          
      } catch (error) {
          AxiosToastError(error)
      }
  }

  return (
    <section className='w-full container mx-auto px-2'>
      <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>
         <p className='font-semi-bold text-lg mb-2'>Forgot Password</p>

          <form className='grid gap-4 py-4' onSubmit={handleSubmit}>
            <div className='grid gap-1'>
              <label htmlFor="email">Email :</label>
              <input
                 type='email'
                 id='email'
                 className='bg-blue-50 p-2 border rounded outline-none focus:border-amber-400' 
                 name='email'
                 value={data.email}
                 onChange={handleChange}
                 placeholder='Enter your email'
              />
            </div>

            <button disabled={!validValue} className={` ${validValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"}   text-white py-2 rounded font-semibold my-2 tracking-wide`}>Send OTP</button>
            
          </form>


          <p>
              Already have account ? <Link to={"/login"} className='font-semibold text-green-700 hover:text-green-800'>Login</Link>
          </p>
      </div>
    </section>
  )
}

export default ForgotPassword
