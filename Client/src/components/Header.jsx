import React, { useEffect, useState } from 'react'
import logo from '../assets/logo.png'
import Search from './Search.jsx';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaRegUserCircle } from "react-icons/fa";
import useMobile from '../hooks/useMobile.jsx';
import { FaCartShopping } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import { GoTriangleDown } from "react-icons/go";
import { GoTriangleUp} from "react-icons/go";
import UserMenu from './UserMenu.jsx';
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees.js';
import { useGlobalContext } from '../provider/GlobalProvider';
import DisplayCartItem from './DisplayCartItem';


const Header = () => {
    const [ isMobile ] = useMobile()
    const location = useLocation()
    const isSearchPage = location.pathname === '/search'
    const navigate = useNavigate()
    const user = useSelector((state) => state?.user)
    const [openUserMenu, setOpenUserMenu] = useState(false)
    const cartItem = useSelector(state => state.cartItem.cart)
  
    const { totalPrice, totalQty} = useGlobalContext()
    const [openCartSection,setOpenCartSection] = useState(false)

    const redirectToLoginPage = ()=>{
        navigate("/login")
    }

    const handleCloseUserMenu = ()=>{
        setOpenUserMenu(false)
    }

    const handleMobileUser = ()=>{
        if(!user._id){
            navigate("/login")
            return
        }

        navigate("/user")
    }

  return (
    <header className="h:24 lg:h-20 lg:shadow-md sticky top-0 z-40 flex flex-col justify-center gap-2 bg-white">
      {
        !(isSearchPage && isMobile) && (
                           <div className='container mx-auto flex items-center px-4 justify-between'>
        {/* logo */}
        <div className='h-full'>
          <Link to={"/"} className='h-full flex justify-center items-center'>
            <img src={logo}
                 width={170}
                 height={60} alt="logo" className='hidden lg:block'/>
             <img src={logo} 
                  width={120} 
                  height={60} alt="logo" className='lg:hidden'/>
          </Link>
        </div>

        {/* Search */}
        <div className='hidden lg:block'>
           <Search/>
        </div>

        {/* Login and my cart */}
        <div className=''>
          {/**User icons display only in mobile version */}
          <button className='text-neutral-600 lg:hidden' onClick={handleMobileUser}>
            <FaRegUserCircle size={27}/>
          </button>

          {/**Items to be displayed in dekstop version */}
          <div className='hidden lg:flex items-center gap-10'>
                                     {
                                            user?._id ? (
                                                <div className='relative'>
                                                    <div onClick={()=>setOpenUserMenu(preve => !preve)} className='flex select-none items-center gap-1 cursor-pointer'>
                                                        <p>Account</p>
                                                        {
                                                            openUserMenu ? (
                                                                  <GoTriangleUp size={25}/> 
                                                            ) : (
                                                                <GoTriangleDown size={25}/>
                                                            )
                                                        }
                                                       
                                                    </div>
                                                    {
                                                        openUserMenu && (
                                                            <div className='absolute right-0 top-12'>
                                                                <div className='bg-white rounded p-4 min-w-52 lg:shadow-lg'>
                                                                    <UserMenu close={handleCloseUserMenu}/>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                    
                                                </div>
                                            ) : (
                                                <button onClick={redirectToLoginPage} className='text-lg px-2 cursor-pointer'>Login</button>
                                            )
                                        }












            
             <button onClick={()=>setOpenCartSection(true)} className='cursor-pointer flex items-center gap-2 bg-green-800 hover:bg-green-700 px-3 py-3 rounded text-white'>
                   {/* add to cart icon */}
                   <div className='animate-bounce'>
                      <FaCartShopping size={27}/>
                   </div>
                   <div className='font-semibold text-sm'>
                        {
                          cartItem[0] ? (
                            <div>
                              <p>{totalQty}Items</p>
                              <p>{DisplayPriceInRupees(totalPrice)}</p>
                            </div>
                          ) : (
                             <p>My Cart</p>
                          )
                        }
                        
                   </div>
             </button>
          </div>
        </div>

                           </div>
        )
      }

      <div className='container mx-auto px-2 lg:hidden'>
        <Search/>
      </div>

      {
          openCartSection && (
              <DisplayCartItem close={()=>setOpenCartSection(false)}/>
          )
      }

    </header>
  );
}

export default Header

