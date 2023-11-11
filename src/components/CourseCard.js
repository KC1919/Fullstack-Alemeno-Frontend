import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { serverUrl } from "../constants";
import { useNavigate, useLocation } from 'react-router-dom'
import Header from "./Header";

const CourseCard = (props) => {

    const navigate = useNavigate();

    const [courseList, setCourses] = useState([]);
    const [page, setPage] = useState(0);
    const [count, setCount] = useState(20);
    const [limit, setPerPageLimit] = useState(5);

    // const courses = [
    //     {
    //         "_id": "654d3179667f9dfbcc14d324",
    //         "name": "Advance Docker",
    //         "description": "This is a Docker course for intermediate. Covering all the concepts from scratch and learning it up with fun.",
    //         "instructor": "Ayush",
    //         "enrollment": "Open",
    //         "duration": "15h",
    //         "schedule": "Daily",
    //         "preRequisites": [
    //             "Baiscs of Containers"
    //         ],
    //         "syllabus": [
    //             {
    //                 "week": "1",
    //                 "topic": "Intro to Containers",
    //                 "content": "Overview of containers, benefits of using container, need of containers",
    //                 "_id": "654d3179667f9dfbcc14d325"
    //             },
    //             {
    //                 "week": "2",
    //                 "topic": "Baics of Hypervisor",
    //                 "content": "Deep dive into the world of Hypervisors. Types of Hypervisors and their respective usecase",
    //                 "_id": "654d3179667f9dfbcc14d326"
    //             }
    //         ],
    //         "enrollCount": 2,
    //         "__v": 0,
    //         "createdAt": "2023-11-09T19:22:33.165Z",
    //         "updatedAt": "2023-11-10T21:46:00.069Z"
    //     },
    //     {
    //         "_id": "654d3179667f9dfbcc14d327",
    //         "name": "Into to Fullstack Development",
    //         "description": "This is a Fullstack Developer course for absolute beginners. Covering all the concepts from scratch and learning it up with fun.",
    //         "instructor": "Kunal",
    //         "enrollment": "Closed",
    //         "duration": "45h",
    //         "schedule": "Mondays, Thursdays, 4:00 pm - 6:00 pm",
    //         "preRequisites": [
    //             "Baiscs of HTML, CSS and Javascript"
    //         ],
    //         "syllabus": [
    //             {
    //                 "week": "1",
    //                 "topic": "Intro to Browser",
    //                 "content": "Overview of Browser, bhow browser works, behind the scenes",
    //                 "_id": "654d3179667f9dfbcc14d328"
    //             },
    //             {
    //                 "week": "2",
    //                 "topic": "DOM Manipulation",
    //                 "content": "Everything about DOM manipulation and need for React",
    //                 "_id": "654d3179667f9dfbcc14d329"
    //             }
    //         ],
    //         "enrollCount": 3,
    //         "__v": 0,
    //         "createdAt": "2023-11-09T19:22:33.168Z",
    //         "updatedAt": "2023-11-11T06:11:11.122Z"
    //     },
    //     {
    //         "_id": "654d3179667f9dfbcc14d32a",
    //         "name": "React for Beginners",
    //         "description": "This is a React Developer course for absolute beginners. Covering all the concepts from scratch and learning it up with fun.",
    //         "instructor": "Kunal",
    //         "enrollment": "Closed",
    //         "duration": "65h",
    //         "schedule": "Mondays, Thursdays, 4:00 pm - 6:00 pm",
    //         "preRequisites": [
    //             "Baiscs of HTML, CSS and Javascript",
    //             "Essentials of Javascript"
    //         ],
    //         "syllabus": [
    //             {
    //                 "week": "1",
    //                 "topic": "Intro to DOM",
    //                 "content": "Overview of DOM and how it works behind the scenes",
    //                 "_id": "654d3179667f9dfbcc14d32b"
    //             },
    //             {
    //                 "week": "2",
    //                 "topic": "Need of React",
    //                 "content": "Everything about React and why it is needed",
    //                 "_id": "654d3179667f9dfbcc14d32c"
    //             },
    //             {
    //                 "week": "3",
    //                 "topic": "State Management",
    //                 "content": "What is state management and why it is needed",
    //                 "_id": "654d3179667f9dfbcc14d32d"
    //             }
    //         ],
    //         "enrollCount": 4,
    //         "__v": 0,
    //         "createdAt": "2023-11-09T19:22:33.168Z",
    //         "updatedAt": "2023-11-11T06:14:25.256Z"
    //     },
    //     {
    //         "_id": "654f2127c0c7fb0fa3bad025",
    //         "name": "Python for Data Science",
    //         "description": "Comprehensive course covering Python programming specifically for data science applications.",
    //         "instructor": "Dr. Smith",
    //         "enrollment": "Open",
    //         "duration": "20h",
    //         "schedule": "Twice a week",
    //         "preRequisites": [
    //             "Basic Python knowledge"
    //         ],
    //         "syllabus": [
    //             {
    //                 "week": "1",
    //                 "topic": "Introduction to Python for Data Science",
    //                 "content": "Overview of Python's usage in data science, basic libraries",
    //                 "_id": "654f2127c0c7fb0fa3bad026"
    //             },
    //             {
    //                 "week": "2",
    //                 "topic": "Data Manipulation with Pandas",
    //                 "content": "Working with data frames, manipulation techniques",
    //                 "_id": "654f2127c0c7fb0fa3bad027"
    //             },
    //             {
    //                 "week": "3",
    //                 "topic": "Data Visualization with Matplotlib and Seaborn",
    //                 "content": "Creating visualizations, charts, and graphs",
    //                 "_id": "654f2127c0c7fb0fa3bad028"
    //             }
    //         ],
    //         "enrollCount": 0,
    //         "__v": 0,
    //         "createdAt": "2023-11-11T06:37:27.743Z",
    //         "updatedAt": "2023-11-11T06:37:27.743Z"
    //     },
    //     {
    //         "_id": "654f215ec0c7fb0fa3bad038",
    //         "name": "Web Development Bootcamp",
    //         "description": "An intensive bootcamp covering modern web development technologies and practices.",
    //         "instructor": "Emily Johnson",
    //         "enrollment": "Closed",
    //         "duration": "30h",
    //         "schedule": "Weekends",
    //         "preRequisites": [
    //             "Basic understanding of HTML, CSS, and JavaScript"
    //         ],
    //         "syllabus": [
    //             {
    //                 "week": "1",
    //                 "topic": "HTML5 and CSS3 Fundamentals",
    //                 "content": "Building web pages with HTML5 and styling with CSS3",
    //                 "_id": "654f215ec0c7fb0fa3bad039"
    //             },
    //             {
    //                 "week": "2",
    //                 "topic": "JavaScript and Frontend Frameworks",
    //                 "content": "Introduction to JavaScript, React, and Angular",
    //                 "_id": "654f215ec0c7fb0fa3bad03a"
    //             },
    //             {
    //                 "week": "3",
    //                 "topic": "Backend Development with Node.js",
    //                 "content": "Creating server-side applications with Node.js",
    //                 "_id": "654f215ec0c7fb0fa3bad03b"
    //             }
    //         ],
    //         "enrollCount": 0,
    //         "__v": 0,
    //         "createdAt": "2023-11-11T06:38:22.985Z",
    //         "updatedAt": "2023-11-11T06:38:22.985Z"
    //     },
    //     {
    //         "_id": "654f219bc0c7fb0fa3bad04f",
    //         "name": "Machine Learning Fundamentals",
    //         "description": "A beginner-friendly course covering the basics of machine learning algorithms and applications.",
    //         "instructor": "Dr. Angela Davis",
    //         "enrollment": "Open",
    //         "duration": "25h",
    //         "schedule": "Three times a week",
    //         "preRequisites": [
    //             "Basic understanding of Python"
    //         ],
    //         "syllabus": [
    //             {
    //                 "week": "1",
    //                 "topic": "Introduction to Machine Learning",
    //                 "content": "Overview of ML, supervised vs. unsupervised learning",
    //                 "_id": "654f219bc0c7fb0fa3bad050"
    //             },
    //             {
    //                 "week": "2",
    //                 "topic": "Linear Regression and Classification",
    //                 "content": "Fundamentals of linear models for regression and classification",
    //                 "_id": "654f219bc0c7fb0fa3bad051"
    //             },
    //             {
    //                 "week": "3",
    //                 "topic": "Clustering and Dimensionality Reduction",
    //                 "content": "Clustering algorithms, PCA",
    //                 "_id": "654f219bc0c7fb0fa3bad052"
    //             }
    //         ],
    //         "enrollCount": 0,
    //         "__v": 0,
    //         "createdAt": "2023-11-11T06:39:23.645Z",
    //         "updatedAt": "2023-11-11T06:39:23.645Z"
    //     },
    //     {
    //         "_id": "654f21aac0c7fb0fa3bad06a",
    //         "name": "iOS App Development",
    //         "description": "Learn to create applications for Apple devices using Swift.",
    //         "instructor": "John Smith",
    //         "enrollment": "Open",
    //         "duration": "18h",
    //         "schedule": "Flexible",
    //         "preRequisites": [
    //             "Basic programming knowledge"
    //         ],
    //         "syllabus": [
    //             {
    //                 "week": "1",
    //                 "topic": "Introduction to Swift",
    //                 "content": "Basic syntax and principles of Swift",
    //                 "_id": "654f21aac0c7fb0fa3bad06b"
    //             },
    //             {
    //                 "week": "2",
    //                 "topic": "UIKit and Interface Builder",
    //                 "content": "Creating user interfaces for iOS apps",
    //                 "_id": "654f21aac0c7fb0fa3bad06c"
    //             },
    //             {
    //                 "week": "3",
    //                 "topic": "Networking and Data Persistence",
    //                 "content": "Working with data and connecting to servers",
    //                 "_id": "654f21aac0c7fb0fa3bad06d"
    //             }
    //         ],
    //         "enrollCount": 0,
    //         "__v": 0,
    //         "createdAt": "2023-11-11T06:39:38.276Z",
    //         "updatedAt": "2023-11-11T06:39:38.276Z"
    //     },
    //     {
    //         "_id": "654f2253c0c7fb0fa3bad089",
    //         "name": "Financial Planning and Wealth Management",
    //         "description": "A course on personal finance and investment strategies.",
    //         "instructor": "Sophia Williams",
    //         "enrollment": "Closed",
    //         "duration": "22h",
    //         "schedule": "Once a week",
    //         "preRequisites": [
    //             "None"
    //         ],
    //         "syllabus": [
    //             {
    //                 "week": "1",
    //                 "topic": "Understanding Personal Finance",
    //                 "content": "Budgeting, savings, and debt management",
    //                 "_id": "654f2253c0c7fb0fa3bad08a"
    //             },
    //             {
    //                 "week": "2",
    //                 "topic": "Investment and Wealth Creation",
    //                 "content": "Types of investments and wealth accumulation strategies",
    //                 "_id": "654f2253c0c7fb0fa3bad08b"
    //             },
    //             {
    //                 "week": "3",
    //                 "topic": "Retirement and Estate Planning",
    //                 "content": "Preparing for retirement and managing estates",
    //                 "_id": "654f2253c0c7fb0fa3bad08c"
    //             }
    //         ],
    //         "enrollCount": 0,
    //         "__v": 0,
    //         "createdAt": "2023-11-11T06:42:28.299Z",
    //         "updatedAt": "2023-11-11T06:42:28.299Z"
    //     },
    //     {
    //         "_id": "654f2253c0c7fb0fa3bad08d",
    //         "name": "Photography Essentials",
    //         "description": "Learn the fundamentals of photography, from composition to editing.",
    //         "instructor": "David Johnson",
    //         "enrollment": "Open",
    //         "duration": "12h",
    //         "schedule": "Weekdays",
    //         "preRequisites": [
    //             "Basic knowledge of using a camera"
    //         ],
    //         "syllabus": [
    //             {
    //                 "week": "1",
    //                 "topic": "Understanding Camera Settings",
    //                 "content": "Exposure, aperture, and shutter speed",
    //                 "_id": "654f2253c0c7fb0fa3bad08e"
    //             },
    //             {
    //                 "week": "2",
    //                 "topic": "Composition and Framing",
    //                 "content": "Rule of thirds, leading lines, and framing",
    //                 "_id": "654f2253c0c7fb0fa3bad08f"
    //             },
    //             {
    //                 "week": "3",
    //                 "topic": "Introduction to Editing",
    //                 "content": "Basic editing techniques using software",
    //                 "_id": "654f2253c0c7fb0fa3bad090"
    //             }
    //         ],
    //         "enrollCount": 0,
    //         "__v": 0,
    //         "createdAt": "2023-11-11T06:42:28.682Z",
    //         "updatedAt": "2023-11-11T06:42:28.682Z"
    //     },
    //     {
    //         "_id": "654f2253c0c7fb0fa3bad091",
    //         "name": "Ethical Hacking & Cybersecurity",
    //         "description": "A comprehensive guide to cybersecurity and ethical hacking principles.",
    //         "instructor": "Alexandra Black",
    //         "enrollment": "Open",
    //         "duration": "28h",
    //         "schedule": "Twice a week",
    //         "preRequisites": [
    //             "Basic understanding of computers and networks"
    //         ],
    //         "syllabus": [
    //             {
    //                 "week": "1",
    //                 "topic": "Introduction to Cybersecurity",
    //                 "content": "Overview of security principles and threats",
    //                 "_id": "654f2253c0c7fb0fa3bad092"
    //             },
    //             {
    //                 "week": "2",
    //                 "topic": "Ethical Hacking Techniques",
    //                 "content": "Penetration testing, tools, and methodologies",
    //                 "_id": "654f2253c0c7fb0fa3bad093"
    //             },
    //             {
    //                 "week": "3",
    //                 "topic": "Security Best Practices",
    //                 "content": "Secure coding, network security, and data protection",
    //                 "_id": "654f2253c0c7fb0fa3bad094"
    //             }
    //         ],
    //         "enrollCount": 0,
    //         "__v": 0,
    //         "createdAt": "2023-11-11T06:42:28.687Z",
    //         "updatedAt": "2023-11-11T06:42:28.687Z"
    //     }
    // ]

    useEffect(() => {
        const fetchCourses = async () => {
            let response;
            let jsonResp;
            let courses;

            response = await fetch(`${serverUrl}/course/allCourses?limit=${limit}&page=${page}`, {
                method: 'GET',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' }
            });
            jsonResp = await response.json();
            courses = jsonResp.courses;

            // console.log(courses);
            setCourses(courses);
        }
        fetchCourses();
    }, [])

    const handleSearch = async (e) => {
        try {
            const searchKeyword = document.getElementById('search-box').value;
            if (searchKeyword.length > 0) {
                const response = await fetch(`${serverUrl}/course/search?search=${searchKeyword}`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' }
                });

                const jsonResp = await response.json();
                const courses = jsonResp.courses;
                setCourses(courses);
            } else {
                alert("Enter something to search");
            }

        } catch (error) {
            console.log("Failed to search course, server error");
            alert(`Failed to search course, server error\n${error}`);
        }
    }

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
            const cid = e.target.id.split('-')[1];

            const response = await fetch(`${serverUrl}/student/enroll`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ cid: cid })
            });

            const jsonResp = await response.json();

            alert(jsonResp.message);

        } catch (error) {
            console.log("Hello");
            console.log("Failed to enroll!", error);
            alert(`Failed to enroll!\n${error}`);
        }
    }

    const handleNextPage = async (e) => {
        try {
            setPage(page + 1);
            const response = await fetch(`${serverUrl}/course/allCourses?limit=${limit}&page=${page}`, {
                method: 'GET',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' }
            });
            const jsonResp = await response.json();
            const courses = jsonResp.courses;

            // console.log(courses);
            setCourses(courses);
        } catch (error) {
            console.log("Failed to handle next page", error);
            alert("Failed to handle next page");
        }
    }

    const handlePrevPage = async (e) => {
        try {
            setPage(page - 1);
            const response = await fetch(`${serverUrl}/course/allCourses?limit=${limit}&page=${page}`, {
                method: 'GET',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' }
            });
            const jsonResp = await response.json();
            const courses = jsonResp.courses;

            // console.log(courses);
            setCourses(courses);
        } catch (error) {
            console.log("Failed to handle prev page", error);
            alert("Failed to handle prev page");
        }
    }

    return (
        <>
            <Header content="Courses" />
            <div className='search-div' style={{ display: "flex", width: "30vw", margin: "0 auto" }}>
                <input className='form-control' id='search-box' type="text" placeholder='Search Courses' />
                <button style={{ margin: "0 1rem" }} className='btn btn-primary btn-sm' onClick={handleSearch}>Search</button>
            </div>
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
                                {(localStorage.getItem('isAuthenticated') == 'true' && course.enrollment == 'Open') ?
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

                <div className="pagination-div" style={{display:"flex", justifyContent:"space-around", alignItems:"center"}}>
                    {(page*limit) > limit?
                        <button className="btn btn-danger btn-sm" onClick={handlePrevPage}>Prev</button>:null
                    }
                    {(page*limit) < count?
                        <button className="btn btn-danger btn-sm" onClick={handleNextPage}>Next</button> : null
                    }
                </div>
            </div>
        </>
    );
};

export default CourseCard;
