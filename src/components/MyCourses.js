import React, { useEffect, useState } from 'react';
import { serverUrl } from '../constants';
import Header from './Header';
import { useNavigate } from 'react-router-dom';

const MyCourses = () => {

    const navigate = useNavigate();
    const [courseList, setCourses] = useState([]);
    useEffect(() => {
        const fetchMyCourses = async () => {

            const response = await fetch(`${serverUrl}/student/enrolledCourses`, {
                method: 'GET',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' }
            });

            console.log(response);

            const jsonResp = await response.json();
            const courses = jsonResp.enrolledCourses;

            console.log(courses);
            setCourses(courses);

        }

        fetchMyCourses();
    }, []);

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

    return (
        <>
            <Header content="My Courses" />
            <div className="row" id='course-container' style={{ padding: "1rem", justifyContent: "center", width: "100vw", margin: "0 auto" }}>
                {courseList.map(course => (
                    <div className="card row-lg" id={`card-${course._id}`} key={course._id} style={{ width: "18rem", margin: "1rem" }} onMouseOver={changeCursor} >
                        <img src={require('../img/course_img.png')} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">{course.name}</h5>
                            <p className="card-text">
                                {`Progress ${course.progress}%`}
                            </p>
                            <p className="card-text">
                                {`Due Date ${new Date(course.dueDate).toLocaleDateString()}`}
                            </p>
                            <div style={{ display: "flex", justifyContent: "space-around" }}>
                                <em><p>Inst. {course.instructor}</p></em>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-around" }}>
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

export default MyCourses