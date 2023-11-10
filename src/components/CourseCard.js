import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { serverUrl } from "../constants";
import { useNavigate } from 'react-router-dom'
import Header from "./Header";

const Course = (props) => {

    const navigate = useNavigate();

    const [courseList, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            const limit = 5;
            const page = 1;
            const response = await fetch(`${serverUrl}/course/allCourses?limit=${limit}&page=${page}`, {
                method: 'GET',
                credentials:'include',
                headers: { 'Content-Type': 'application/json' }
            });

            const jsonResp = await response.json();
            const courses = jsonResp.courses;

            // console.log(courses);
            setCourses(courses);
        }
        fetchCourses();
    }, [])

    function handleCourseClick(e) {
        try {
            // console.log(e.target.id);
            let courseDetails = [];
            for (let i = 0; i < courseList.length; i++) {
                if (courseList[i]._id == e.target.id) {
                    courseDetails.push(courseList[i]);
                    break;
                }
            }
            navigate('/course', { state: courseDetails });
        } catch (error) {
            console.log("failed to navigate to course detail page", error);
        }
    }

    function changeCursor(e) {
        try {
            const cardElem = e.target;
            cardElem.style.cursor = "pointer";
        } catch (error) {
            console.log("Failed to change cursor to pointer", error);
        }
    }

    const handleEnroll = async (e) => {
        try {
            const cid=e.target.id.split('-')[1];
            console.log(cid);

            const response=await fetch(`${serverUrl}/course/enroll`,{
                method:'POST',
                credentials:'include',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({cid:cid})
            });

            console.log(response);

            // console.log(jsonResp);
        } catch (error) {
            console.log("Hello");
            console.log("Failed to enroll!", error);
            alert(`Failed to enroll!\n${error}`);
        }
    }

    return (
        <>
            <Header content="Courses" />
            <div className="row" id='course-container' style={{ padding: "1rem", justifyContent: "center", width: "100vw", margin: "0 auto" }}>
                {courseList.map(course => (
                    <div className="card row-lg" id={`card-${course._id}`} key={course._id} style={{ width: "18rem", margin: "1rem" }} onMouseOver={changeCursor} >
                        <img src={require('../img/course_img.png')} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">{course.name}</h5>
                            <p className="card-text">
                                {course.description}
                            </p>
                            <div style={{ display: "flex", justifyContent: "space-around" }}>
                                <em><p>Inst. {course.instructor}</p></em>
                                <b><p>{course.enrollment}</p></b>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-around" }}>
                                {(localStorage.getItem('isAuthenticated') == 'true') ?
                                    <button className="btn btn-primary" onClick={handleEnroll} id={`btn-${course._id}`}>
                                        Enroll
                                    </button>
                                    : ""}
                                <button className="btn btn-primary" id={course._id} onClick={handleCourseClick}>
                                    Details
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Course;
