import React, { useState } from 'react';
import { HomePageExplore } from '../../../data/homepage-explore';
import HighlightText from '../HomePage/HighlightText';
import CourseCard from '../HomePage/CourseCard';

const tabsName = ['Free', 'New to coding', 'Most popular', 'Skills paths', 'Career paths'];

function ExploreMore() {
  const [currentTab, setCurrentTab] = useState(tabsName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

  const setMyCards = (value) => {
    setCurrentTab(value);
    const result = HomePageExplore.filter((course) => course.tag === value);
    setCourses(result[0].courses);
    setCurrentCard(result[0].courses[0].heading);
  };

  return (
    <div className="w-11/12 max-w-maxContent relative mb-16">
      {/* Title Section */}
      <div className="text-4xl font-bold text-center">
        Unlock the <HighlightText text="Power of Code" />
      </div>
      <p className="text-center text-richblack-300 text-lg mt-3">
        Learn to build anything you can imagine
      </p>

      {/* Tabs */}
      <div className="flex mt-5 w-[70%] rounded-full bg-richblack-800 border border-richblack-700 mb-14 px-1 py-1 justify-center gap-4 mx-auto">
        {tabsName.map((element, index) => (
          <div
            className={`text-[16px] flex items-center gap-2 px-6 py-2 cursor-pointer rounded-full transition-all duration-200 ${
              currentTab === element
                ? 'bg-richblack-900 text-white font-medium shadow-md'
                : 'text-richblack-300 hover:bg-richblack-900 hover:text-white'
            }`}
            key={index}
            onClick={() => setMyCards(element)}
          >
            {element}
          </div>
        ))}
      </div>

      {/* Courses */}
      <div className='relative'>
      <div className=" absolute flex gap-10 justify-center w-full">
        {courses.map((element, index) => (
          <CourseCard
            key={index}
            cardData={element}
            currentCard={currentCard}
            setCurrentCard={setCurrentCard}
          />
        ))}
        </div>
      </div>
    </div>
  );
}

export default ExploreMore;
