import React from 'react'
import Template from '../components/core/Authentication/Template'
import SignupImage from "../assets/Images/signup.webp"
function SignupPage({setisLoggedin,pageclass}) {
  return (
    <Template
    title="Join the millions learning to code with StudyNotion for free"
    desc1="Build skills for today,tomorrow,and beyond."
    desc2="Education to future-proof your career"
    image={SignupImage}
    formtype="signup"
    setisLoggedin={setisLoggedin}
    pageclass={pageclass}
    ></Template>
  )
}

export default SignupPage