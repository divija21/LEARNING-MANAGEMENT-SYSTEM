import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from 'humanize-duration'

export const AppContext= createContext();

export const AppContextProvider=(props)=>{
    const currency = import.meta.env.VITE_CURRENCY;
const navigate =useNavigate()

    const [allCourses,setAllCourses]=useState([]);
    // if we pass "true" then user is educator automatically and signin as educator if false then user is not educator
    const[isEducator,setIsEducator]=useState(true)
    const [enrolledCourses,setEnrolledCourses] = useState([]);

    // Fetch All Courses
    const fetchAllCourses= async()=>{
        setAllCourses(dummyCourses)
    }
    // to calculate avergae rating of course
    
    const calculateRating=(course)=>{
if(course.courseRatings.length ===0){
    return 0;
}

    let totalRating=0;
    course.courseRatings.forEach((rating)=>{
        totalRating+=rating.rating
    })
    return totalRating/course.courseRatings.length

    }
    const calculateChapterTime=(chapter)=>{
        let time=0;
        chapter.chapterContent.map((lecture)=>time+=lecture.lectureDuration)
        return humanizeDuration(time * 60 * 1000,{units:["m"]})

    }
    // functio to calculate the duration of course
    const calculateCourseDuration=(course)=>{
        let time=0;
        course.courseContent.map((chapter)=>chapter.chapterContent.map((lecture)=>time+=lecture.lectureDuration))
        return  humanizeDuration(time * 60 * 1000,{units:["h","m"]})

    }
    //number of lectures in the course
    const calculateNoOfLectures =(course)=>{
        let sum=0;
        course.courseContent.forEach(chapter=>{
            if(Array.isArray(chapter.chapterContent)){
                sum+=chapter.chapterContent.length
            }
        });
        return sum;

    }

    const fetchUserEnrolledCourses = async ()=>{
        setEnrolledCourses(dummyCourses)
    }
    useEffect(()=>{
        fetchAllCourses()
        fetchUserEnrolledCourses()
    },[])

    const value={
currency,
allCourses,navigate,
calculateRating,
calculateCourseDuration,
calculateChapterTime,
calculateNoOfLectures,
isEducator,
enrolledCourses,
fetchUserEnrolledCourses
    }

    // Fetch

    
    
return(
    <AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>
)
}