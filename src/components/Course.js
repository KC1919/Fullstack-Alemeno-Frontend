import React from 'react'
import { useLocation } from 'react-router-dom';


const Course = (props) => {

    const location = useLocation()
    const data = location.state;

    const courseDetails=data[0];

    console.log(courseDetails);

    return (
        <div className="course-container" style={{textAlign:"center", width:"100vw", margin:"0 auto"}}>
            <div className='course-header' style={{width:"100vw",margin:"1rem"}}><h2>{courseDetails.name}</h2></div>
            <div className='course-image-div'>
                <img src={require("../img/course_img.png")} alt="Course image" />
            </div>
            <div>
                <p><b>Instructor: </b>{courseDetails.instructor}</p>
                <p><b>Duration: </b>{courseDetails.duration}</p>
                <p><b>Enrollment: </b>{courseDetails.enrollment}</p>
                <p><b>Course Description: </b>{courseDetails.description}</p>
                <p><b>Syllabus</b></p>
                <br />
                {courseDetails.syllabus.map(chapter=>(
                    <div style={{width:"50vw",margin:"0 auto",textAlign:"left"}}>
                        <p><b>Week</b>: {chapter.week}</p>
                        <p><b>Topic</b>: {chapter.topic}</p>
                        <p><b>Content</b>: {chapter.content}</p>
                        <hr />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Course