import React, { useContext } from 'react'
import { useState, useEffect } from 'react'
import { request } from '../utils/request'
import { getToken, removeToken } from '../utils/localstorage'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../App'
import { message } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserGraduate, faUserPen, faGraduationCap, faUser, faCalendarDay, faBook } from '@fortawesome/free-solid-svg-icons'
import './AuthLayout.css'

function AuthLayout({ children }) {
    const [currentTab, setCurrentTab] = useState('')
    const [style, setStyle] = useState("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");
    const navigate = useNavigate()
    const { setProfile, profile } = useContext(AppContext)
    const { isUser } = useContext(AppContext)
    useEffect(() => {
        const token = getToken()
        request.defaults.headers = {
            "Authorization": `Bearer ${getToken()}`
        }
        if (token) {
            request.get('/profile').then(({ data }) => {
                // console.log(data)
                setProfile(data)
            })
        } else {
            navigate('/login')
        }
    }, [])

    useEffect(() => {
        currentTab && navigate(`/home/${currentTab}`)
    }, [currentTab])

    const changeStyle = () => {

        if (style === "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion") {
            setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled");
        }
        else {
            setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion")
        }
    };
    const changeStyle1 = () => {
        if (style == "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion") {
            setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled1");
        }
        else {
            setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion")
        }
    }

    const handleLogout = () => {
        removeToken()
        navigate('/login')
        message.success('Logout success!')
    }

    return (
        <div>
            <div className="row">
                <div className="col-sm-2 form_home">
                    <ul className={style} id="accordionSidebar">
                        <a className="sidebar-brand d-flex align-items-center justify-content-center" href="#">
                            <div className="sidebar-brand-icon rotate-n-15">
                                <i className="fas fa-laugh-wink"></i>
                            </div>
                            <div className="sidebar-brand-text mx-3">Student Admin</div>
                            <div className="text-center d-none d-md-inline">
                                <button className="rounded-circle border-0" id="sidebarToggle" onClick={changeStyle}></button>
                            </div>
                        </a>
                        <hr className="sidebar-divider my-0" />
                        <li className="nav-item active" onClick={() => setCurrentTab("dashboard")}>
                            <a className="nav-link">
                                <i className="fas fa-fw fa-tachometer-alt"></i>
                                <span>Dashboard</span></a>
                        </li>
                        <hr className="sidebar-divider" />
                        <div className="sidebar-heading">
                            Interface
                        </div>
                        {/*  <!-- Nav Item - Pages Collapse Menu --> */}
                        <li className="nav-item" onClick={() => setCurrentTab("student")}>
                            <a className="nav-link">
                                <i className='student'><FontAwesomeIcon icon={faUserGraduate} /></i>
                                <span>Student</span></a>
                        </li>

                        <li className="nav-item" onClick={() => setCurrentTab("teacher")}>
                            <a className="nav-link">
                                <i className="teacher"><FontAwesomeIcon icon={faUserPen} /></i>
                                <span>Teacher</span></a>
                        </li>
                        <li className="nav-item" onClick={() => setCurrentTab("class")}>
                            <a className="nav-link">
                                <i className="class"><FontAwesomeIcon icon={faGraduationCap} /></i>
                                <span>Class</span></a>
                        </li>

                        <li className="nav-item" onClick={() => setCurrentTab("class_schedule")}>
                            <a className="nav-link">
                                <i><FontAwesomeIcon icon={faCalendarDay} /></i>
                                <span>Schedule</span></a>
                        </li>
                        <li className="nav-item" onClick={() => setCurrentTab("subject")}>
                            <a className="nav-link">
                                <i className="subject"><FontAwesomeIcon icon={faBook} /></i>
                                <span>Subject</span></a>
                        </li>

                        <li className="nav-item" onClick={() => setCurrentTab("user")}>
                            <a className="nav-link">
                                <i className="user"><FontAwesomeIcon icon={faUser} /></i>
                                <span>User</span></a>
                        </li>

                        {/* <!-- Nav Item - Utilities Collapse Menu --> */}
                        {/* <li className="nav-item">
                                    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities"
                                        aria-expanded="true" aria-controls="collapseUtilities">
                                        <i className="fas fa-fw fa-wrench"></i>
                                        <span>Utilities</span>
                                    </a>
                                    <div id="collapseUtilities" className="collapse" aria-labelledby="headingUtilities"
                                        data-parent="#accordionSidebar">
                                        <div className="bg-white py-2 collapse-inner rounded">
                                            <h6 className="collapse-header">Custom Utilities:</h6>
                                            <a className="collapse-item" href="utilities-color.html">Colors</a>
                                            <a className="collapse-item" href="utilities-border.html">Borders</a>
                                            <a className="collapse-item" href="utilities-animation.html">Animations</a>
                                            <a className="collapse-item" href="utilities-other.html">Other</a>
                                        </div>
                                    </div>
                                </li> */}
                        {/*  <!-- Nav Item - Pages Collapse Menu --> */}
                        {/* <li className="nav-item">
                                    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages"
                                        aria-expanded="true" aria-controls="collapsePages">
                                        <i className="fas fa-fw fa-folder"></i>
                                        <span>Pages</span>
                                    </a>
                                    <div id="collapsePages" className="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
                                        <div className="bg-white py-2 collapse-inner rounded">
                                            <h6 className="collapse-header">Login Screens:</h6>
                                            <a className="collapse-item" href="login.html">Login</a>
                                            <a className="collapse-item" href="register.html">Register</a>
                                            <a className="collapse-item" href="forgot-password.html">Forgot Password</a>
                                            <div className="collapse-divider"></div>
                                            <h6 className="collapse-header">Other Pages:</h6>
                                            <a className="collapse-item" href="404.html">404 Page</a>
                                            <a className="collapse-item" href="blank.html">Blank Page</a>
                                        </div>
                                    </div>
                                </li> */}
                        {/* <!-- Nav Item - Charts --> */}
                        {/* <li className="nav-item">
                                    <a className="nav-link" href="charts.html">
                                        <i className="fas fa-fw fa-chart-area"></i>
                                        <span>Charts</span></a>
                                </li> */}
                        {/*  <!-- Nav Item - Tables --> */}
                        {/* <li className="nav-item">
                                    <a className="nav-link" href="tables.html">
                                        <i className="fas fa-fw fa-table"></i>
                                        <span>Tables</span></a>
                                </li> */}
                    </ul>
                </div>
                <div className="col-sm-10">
                    <div className='Navigation-right'>
                        {/*  <!-- Topbar --> */}
                        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                            {/*  <!-- Sidebar Toggle (Topbar) --> */}
                            <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3" onClick={changeStyle1}>
                                <i className="fa fa-bars"></i>
                            </button>
                            {/*  <!-- Topbar Search --> */}
                            <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                                <div className="input-group">
                                    <div className="input-group-append">
                                    </div>
                                </div>
                            </form>
                            {/*  <!-- Topbar Navbar --> */}
                            <ul className="navbar-nav ml-auto">
                                {/*  <!-- Nav Item - Search Dropdown (Visible Only XS) --> */}
                                <li className="nav-item dropdown no-arrow d-sm-none">
                                    <a className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button"
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="fas fa-search fa-fw"></i>
                                    </a>
                                    {/*   <!-- Dropdown - Messages --> */}
                                    <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                                        aria-labelledby="searchDropdown">
                                        <form className="form-inline mr-auto w-100 navbar-search">
                                            <div className="input-group">
                                                <input type="text" className="form-control bg-light border-0 small"
                                                    placeholder="Search for..." aria-label="Search"
                                                    aria-describedby="basic-addon2" />
                                                <div className="input-group-append">
                                                    <button className="btn btn-primary" type="button">
                                                        <i className="fas fa-search fa-sm"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </li>
                                {/*  <!-- Nav Item - Alerts --> */}
                                <li className="nav-item dropdown no-arrow mx-1">
                                    <a className="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button"
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="fas fa-bell fa-fw"></i>
                                        {/*  <!-- Counter - Alerts --> */}
                                        <span className="badge badge-danger badge-counter">3+</span>
                                    </a>
                                    {/*   <!-- Dropdown - Alerts --> */}
                                    <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                        aria-labelledby="alertsDropdown">
                                        <h6 className="dropdown-header">
                                            Alerts Center
                                        </h6>
                                        <a className="dropdown-item d-flex align-items-center" href="#">
                                            <div className="mr-3">
                                                <div className="icon-circle bg-primary">
                                                    <i className="fas fa-file-alt text-white"></i>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="small text-gray-500">December 12, 2019</div>
                                                <span className="font-weight-bold">A new monthly report is ready to download!</span>
                                            </div>
                                        </a>
                                        <a className="dropdown-item d-flex align-items-center" href="#">
                                            <div className="mr-3">
                                                <div className="icon-circle bg-success">
                                                    <i className="fas fa-donate text-white"></i>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="small text-gray-500">December 7, 2019</div>
                                                $290.29 has been deposited into your account!
                                            </div>
                                        </a>
                                        <a className="dropdown-item d-flex align-items-center" href="#">
                                            <div className="mr-3">
                                                <div className="icon-circle bg-warning">
                                                    <i className="fas fa-exclamation-triangle text-white"></i>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="small text-gray-500">December 2, 2019</div>
                                                Spending Alert: We've noticed unusually high spending for your account.
                                            </div>
                                        </a>
                                        <a className="dropdown-item text-center small text-gray-500" href="#">Show All Alerts</a>
                                    </div>
                                </li>

                                {/*  <!-- Nav Item - Messages --> */}
                                <li className="nav-item dropdown no-arrow mx-1">
                                    <a className="nav-link dropdown-toggle" href="#" id="messagesDropdown" role="button"
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="fas fa-envelope fa-fw"></i>
                                        {/*  <!-- Counter - Messages --> */}
                                        <span className="badge badge-danger badge-counter">7</span>
                                    </a>
                                    {/*   <!-- Dropdown - Messages --> */}
                                    <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                        aria-labelledby="messagesDropdown">
                                        <h6 className="dropdown-header">
                                            Message Center
                                        </h6>
                                        <a className="dropdown-item d-flex align-items-center" href="#">
                                            <div className="dropdown-list-image mr-3">
                                                <img className="rounded-circle" src="img/undraw_profile_1.svg"
                                                    alt="..." />
                                                <div className="status-indicator bg-success"></div>
                                            </div>
                                            <div className="font-weight-bold">
                                                <div className="text-truncate">Hi there! I am wondering if you can help me with a
                                                    problem I've been having.</div>
                                                <div className="small text-gray-500">Emily Fowler · 58m</div>
                                            </div>
                                        </a>
                                        <a className="dropdown-item d-flex align-items-center" href="#">
                                            <div className="dropdown-list-image mr-3">
                                                <img className="rounded-circle" src="img/undraw_profile_2.svg"
                                                    alt="..." />
                                                <div className="status-indicator"></div>
                                            </div>
                                            <div>
                                                <div className="text-truncate">I have the photos that you ordered last month, how
                                                    would you like them sent to you?</div>
                                                <div className="small text-gray-500">Jae Chun · 1d</div>
                                            </div>
                                        </a>
                                        <a className="dropdown-item d-flex align-items-center" href="#">
                                            <div className="dropdown-list-image mr-3">
                                                <img className="rounded-circle" src="img/undraw_profile_3.svg"
                                                    alt="..." />
                                                <div className="status-indicator bg-warning"></div>
                                            </div>
                                            <div>
                                                <div className="text-truncate">Last month's report looks great, I am very happy with
                                                    the progress so far, keep up the good work!</div>
                                                <div className="small text-gray-500">Morgan Alvarez · 2d</div>
                                            </div>
                                        </a>
                                        <a className="dropdown-item d-flex align-items-center" href="#">
                                            <div className="dropdown-list-image mr-3">
                                                <img className="rounded-circle" src="https://source.unsplash.com/Mv9hjnEUHR4/60x60"
                                                    alt="..." />
                                                <div className="status-indicator bg-success"></div>
                                            </div>
                                            <div>
                                                <div className="text-truncate">Am I a good boy? The reason I ask is because someone
                                                    told me that people say this to all dogs, even if they aren't good...</div>
                                                <div className="small text-gray-500">Chicken the Dog · 2w</div>
                                            </div>
                                        </a>
                                        <a className="dropdown-item text-center small text-gray-500" href="#">Read More Messages</a>
                                    </div>
                                </li>

                                <div className="topbar-divider d-none d-sm-block"></div>

                                {/* <!-- Nav Item - User Information --> */}
                                <li className="nav-item dropdown no-arrow">
                                    <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <span className="mr-2 d-none d-lg-inline text-gray-600 small">{`${profile.firstname} ${profile.lastname}`}</span>
                                        <img className="img-profile rounded-circle"
                                            src="/img/undraw_profile.svg" />
                                    </a>
                                    {/*  <!-- Dropdown - User Information --> */}
                                    <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                        aria-labelledby="userDropdown">
                                        <a className="dropdown-item" onClick={() => setCurrentTab("profile")}>
                                            <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                                            Profile
                                        </a>
                                        <div className="dropdown-divider"></div>
                                        <a
                                            className="dropdown-item"
                                            //  href="javascript:void(0)" 
                                            onClick={handleLogout}>
                                            <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                            Logout
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </nav>
                        {children}
                    </div>
                </div>
            </div>
        </div>


    )
}

export default AuthLayout