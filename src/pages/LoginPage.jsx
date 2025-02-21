import React from 'react'
import Template from '../components/core/Authentication/Template'
import loginImg from "../assets/Images/login.webp"
function LoginPage({setisLoggedin,pageclass}) {
  return (
    <Template
    title="Welcome Back"
    desc1="Build skills for today,tomorrow,and beyond."
    desc2="Education to future-proof your career"
    image={loginImg}
    formtype="login"
    setisLoggedin={setisLoggedin}
    pageclass={pageclass}
    ></Template>
  )
}

export default LoginPage