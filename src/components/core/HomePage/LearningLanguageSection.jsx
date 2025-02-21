import React from 'react'
import HighlightText from './HighlightText'
import know_Your_progress from "../../../assets/Images/Know_your_progress.png"
import compare_with_others from "../../../assets/Images/Compare_with_others.png"
import plan_your_lesson from "../../../assets/Images/Plan_your_lessons.png"
import CTAbutton from "../HomePage/Button"
function learningLanguageSection() {
  return (
    <div className='mt-[130px] mb-28'>
          <div className='flex flex-col gap-5 items-center'>
              <div className='text-4xl font-semibold text-center'>
                 Your Swiss Knife for 
                 <HighlightText text={" Learning any language"}></HighlightText>
              </div>

              <div className='text-center text-richblack-600 mx-auto text-base mt-3'>
              Using spin making learning multiple languages easy, with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
              </div>

              <div className='flex justify-center items-center'>
                  <img src={know_Your_progress} alt='KnowYourProgress' className='object-contain -mr-32 w-[70%] h-[70%]'></img>

                  <img src={compare_with_others} alt='' className='object-contain w-[70%] h-[70%]'></img>

                  <img src={plan_your_lesson} className='object-contain -ml-36 w-[70%] h-[70%]'></img>

              </div>

              <div className='w-fit'>
                <CTAbutton active={true} linkto="/signup">
                  <div>
                    Learn more
                  </div>
                </CTAbutton>
              </div>
          </div>

    </div>
  )
  ///frontend- 55 min left
}

export default learningLanguageSection