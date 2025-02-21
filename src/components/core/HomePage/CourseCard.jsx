import React from 'react';
import { FaUser } from 'react-icons/fa';
import { FaUsers } from 'react-icons/fa';

function CourseCard({ cardData, currentCard, setCurrentCard }) {
  return (
    <div
      className={`flex flex-col p-6 rounded-lg shadow-md cursor-pointer transition-all duration-300 ${
        currentCard === cardData.heading
          ? 'bg-white text-richblack-900 shadow-xl  bgshadow'
          : 'bg-richblack-800 text-richblack-300 hover:bg-richblack-700'
      }`}
      onClick={() => setCurrentCard(cardData.heading)}
    >
      {/* Heading */}
      <p
        className={`text-lg font-semibold mb-2 ${
          currentCard === cardData.heading ? 'text-richblack-900' : 'text-richblack-100'
        }`}
      >
        {cardData.heading}
      </p>

      {/* Description */}
      <div className="text-sm leading-relaxed mb-4">{cardData.description}</div>

      {/* Footer: Level and Lessons */}
      <div className="flex justify-between items-center mt-auto text-sm text-richblack-500">
        <div className="flex items-center gap-2">
          <FaUser className="text-blue-500" />
          <span>{cardData.level}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaUsers className="text-green-500" />
          <span>{cardData.lessonNumber} Lessons</span>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
//frontend-3 done