
import React from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import HighlightText from '../components/core/HomePage/HighlightText'
import CTAButton from '../components/core/HomePage/Button'
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from '../components/core/HomePage/CodeBlocks'
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection'
import TimelineSection from '../components/core/HomePage/TimelineSection'
import InstructorSection from "../components/core/HomePage/InstructorSection"
import ExploreMore from '../components/core/HomePage/ExploreMore'

function Home() {
    return (
        <div>
            {/*section-1*/}
            <div className=' relative mx-auto flex flex-col w-11/12 items-center justify-between text-white max-w-maxContent'>
                <Link to={"/signup"}>

                    <div className=' group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold transition-all duration-200 hover:scale-95 w-fit text-richblack-200'>
                        <div className=' flex items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900'>
                            <p>Become an Instructor</p>
                            <FaArrowRight></FaArrowRight>
                        </div>

                    </div>
                </Link>

                <div className='text-center text-4xl font-semibold mt-7'>
                    Empower Your Future with
                    <HighlightText text={"Coding Skills"}></HighlightText>
                </div>

                <div className=' mt-4  w-[90%] text-center text-lg font-bold text-richblack-300'>
                    With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
                </div>

                <div className='flex gap-7 mt-8'>
                    <CTAButton active={true} linkto="/signup">
                        Learn More
                    </CTAButton>
                    <CTAButton active={false} linkto="/login">
                        Book a Demo
                    </CTAButton>
                </div>

                <div className="shadow-blue-200 mx-3 my-12 flex justify-center">
                    <video
                        muted
                        loop
                        autoPlay
                        className="w-[70%]"
                        style={{
                            boxShadow: '-37px -16px 125px -14px rgba(46,83,193,0.75), 28px 22px 0px 1px rgba(255,255,255,0.75)', // Updated white shadow
                        }}
                    >
                        <source src={Banner} type="video/mp4" />
                    </video>
                </div>

                {/*code section-1*/}
                <div>
                    <CodeBlocks
                        position={"lg:flex-row"}
                        heading={
                            <div className='text-4xl font-semibold mt-6'>
                                Unlock your
                                <HighlightText text={"coding potential"} />
                                with our online courses
                            </div>
                        }
                        subheading={
                            "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                        }
                        ctabtn1={{
                            btnText: "try it yourself",
                            linkto: "/signup",
                            active: true
                        }}
                        ctabtn2={{
                            btnText: "learn more",
                            linkto: "/login",
                            active: false
                        }}
                        codeblock={`<!DOCTYPE html>
<html>
<head>
  <title>Browser Example</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <h1>
    <a href="/">Browser Header</a>
  </h1>
  <nav>
  `}
                        codeColor={"text-yellow-25"}
                    >
                    </CodeBlocks>

                </div>

                {/*code section-2*/}
                <div>
                    <CodeBlocks
                        position={"lg:flex-row-reverse"}
                        heading={
                            <div className='text-4xl font-semibold mt-5'>
                                Start
                                <HighlightText text={"coding in seconds"} />
                            </div>
                        }
                        subheading={
                            "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson"
                        }
                        ctabtn1={{
                            btnText: "continue Lesson",
                            linkto: "/signup",
                            active: true
                        }}
                        ctabtn2={{
                            btnText: "learn more",
                            linkto: "/login",
                            active: false
                        }}
                        codeblock={`<!DOCTYPE html>
<html>
<head>
  <title>Browser Example</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <h1>
    <a href="/">Browser Header</a>
  </h1>
  <nav>
  `}
                        codeColor={"text-yellow-25"}
                    >
                    </CodeBlocks>
                </div>
                <ExploreMore></ExploreMore>
            </div>


            {/*section-2*/}

            <div className='bg-pure-greys-5 text-richblack-700'>

                <div className='homepage_bg h-[333px]'>

                    <div className='w-11/12 max-w-maxContent flex flex-col items-center gap-5 mx-auto justify-between'>
                        <div className='h-[150px]'></div>
                        <div className='flex gap-7 text-white'>
                            <CTAButton active={true} linkto={"/signup"}>
                                <div className='flex items-center gap-3'>
                                    Explore Full Catlog
                                    <FaArrowRight></FaArrowRight>
                                </div>
                            </CTAButton>
                            <CTAButton active={false} linkto={"/signup"}>
                                <div>
                                    Learn more
                                </div>
                            </CTAButton>
                        </div>


                    </div>


                </div>

                <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7'>

                    <div className='w-full mx-auto flex gap-5 mt-[110px] mb-10'>
                        <div className='w-[45%] font-semibold text-4xl'>
                            Get the skills you need for a
                            <HighlightText text={"Job that is in demand"}></HighlightText>
                        </div>
                        <div className='flex flex-col gap-10 w-[40%] items-start'>
                            <div className='text-[16px]'>
                                The modern StudyNotion dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                            </div>
                            <CTAButton active={true} linkto={"/signup"}>
                                <div>
                                    Learn more
                                </div>
                            </CTAButton>
                        </div>
                    </div>

                    <TimelineSection></TimelineSection>
                    <LearningLanguageSection></LearningLanguageSection>

                </div>


            </div>

            {/*section-3*/}
            <div className='w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between gap-8 first-letter bg-richblack-900 text-white'>
    

            <InstructorSection></InstructorSection>
            
            <h2 className='text-center text-4xl font-semibold mt-10'>review from Other Learners</h2>

            </div>


            {/*footer*/}

        </div >
    )
}

export default Home

//frontend-2/1:20:00 min per media query chee