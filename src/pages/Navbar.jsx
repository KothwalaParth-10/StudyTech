import React, { useEffect, useState } from 'react'
import logo from "../assets/Logo/Logo-Full-Light.png"
import { Link, matchPath } from 'react-router-dom'
import { NavbarLinks } from "../data/navbar-links"
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import ProfileDropDown from '../components/core/Authentication/ProfileDropDown'
import toast from 'react-hot-toast'
import { apiConnector } from '../services/apiconnector'
import { categories } from '../services/apis'
import { IoIosArrowDown } from "react-icons/io";

// const subLinks= [
//     {
//          title:"python",
//          link:"/catalog/python"
//     },
//     {
//            title:"web dev",
//            link:"/catalog/web-development"
//     }
// ]
function Navbar(props) {

    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const { totalItems } = useSelector((state) => state.cart);
    const location = useLocation();

    const [subLinks, setSubLinks] = useState([]);
    const fetchsublinks = async () => {
        try {
            const result = await apiConnector("GET", categories.CATEGORIES_API)
            console.log("Printing Sublinks result:", result.data);
            setSubLinks(result.data.allCategory)

        } catch (error) {
            toast.error("Could not fetch the category list")
        }
    }
    useEffect(() => {
        fetchsublinks();
    }, [])
    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname)
    }
    return (
        <div className=' flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700'>

            <div className='flex w-11/12 max-w-maxContent items-center justify-between'>
                <Link to="/">
                    <img src={logo}></img>
                </Link>

                <nav>
                    <ul className='flex gap-x-6 text-richblack-25'>
                        {
                            NavbarLinks.map((link, index) => {
                                return (
                                    <li key={index}>
                                        {
                                            link.title === "Catalog" ? (
                                                <div className='flex items-center gap-2 group relative'>
                                                    <p>{link.title}</p>
                                                    <IoIosArrowDown />
                                                    <div className=' invisible absolute top-[-80%] left-[50%] flex flex-col rounded-md bg-white p-4 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[300px] translate-x-[-50%] translate-y-[30%] z-50'>
                                                        <div className=' absolute left-[50%] translate-x-[80%] translate-y-[-45%] top-0 h-6 w-6 rotate-45 rounded bg-white'></div>
                                                        {
                                                            subLinks.length ? (
                                                                subLinks.map((subLink, index) => (
                                                                    <Link className='rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50' to={`catalog/${subLink.name}`} key={index}>
                                                                        <p>{subLink.name}</p>
                                                                    </Link>
                                                                ))
                                                            ) : (<span className="loader"></span>)
                                                        }
                                                    </div>
                                                </div>) : (
                                                <Link to={link?.path}>
                                                    <p className={`${matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                                                        {link.title}
                                                    </p>
                                                </Link>
                                            )
                                        }
                                    </li>
                                )
                            })
                        }
                    </ul>
                </nav>

                {/* Login/SignUp/Dashboarrd */}
                <div className='flex gap-x-4 items-center'>
                    {
                        user && user?.accountType != "Instructor" && (
                            <Link to="/dashboard/cart" className=' relative'>
                                <AiOutlineShoppingCart className='text-white text-2xl'></AiOutlineShoppingCart>
                                {
                                    totalItems > 0 && (
                                        <span>
                                            {totalItems}
                                        </span>
                                    )
                                }
                            </Link>
                        )
                    }

                    {
                        token == null && (
                            <Link to="/login">
                                <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                                    Login
                                </button>
                            </Link>
                        )
                    }
                    {
                        token == null && (
                            <Link to="/signup">
                                <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                                    Signup
                                </button>
                            </Link>
                        )
                    }

                    {
                        token !== null && <ProfileDropDown>
                        </ProfileDropDown>
                    }
                </div>
            </div>

        </div>
    )
}

export default Navbar
