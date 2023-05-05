import React, { useState } from 'react';
import './Dashboard.css'
import AuthLayout from '../../layout/AuthLayout';
function Dashboard() {


    return (
        <AuthLayout>
            <div className='id="page-top"'>
                {/*  <!-- Page Wrapper --> */}
                <div id="wrapper">
                    {/*  <!-- Sidebar --> */}
                    <div id="content-wrapper" className="d-flex flex-column">
                        {/*  <!-- Main Content --> */}
                        <div id="content">

                            {/* <!-- Begin Page Content --> */}
                            <div className="container-fluid">
                                {/*  <!-- Page Heading --> */}
                                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                    <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
                                    <a href="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                                        className="fas fa-download fa-sm text-white-50"></i> Generate Report</a>
                                </div>
                                {/*  <!-- Content Row --> */}
                                <div className="row">
                                    {/*  <!-- Earnings (Monthly) Card Example --> */}
                                    <div className="col-xl-3 col-md-6 mb-4">
                                        <div className="card border-left-primary shadow h-100 py-2">
                                            <div className="card-body">
                                                <div className="row no-gutters align-items-center">
                                                    <div className="col mr-2">
                                                        <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                            Earnings (Monthly)</div>
                                                        <div className="h5 mb-0 font-weight-bold text-gray-800">$40,000</div>
                                                    </div>
                                                    <div className="col-auto">
                                                        <i className="fas fa-calendar fa-2x text-gray-300"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/*  <!-- Earnings (Monthly) Card Example --> */}
                                    <div className="col-xl-3 col-md-6 mb-4">
                                        <div className="card border-left-success shadow h-100 py-2">
                                            <div className="card-body">
                                                <div className="row no-gutters align-items-center">
                                                    <div className="col mr-2">
                                                        <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                                            Earnings (Annual)</div>
                                                        <div className="h5 mb-0 font-weight-bold text-gray-800">$215,000</div>
                                                    </div>
                                                    <div className="col-auto">
                                                        <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/*  <!-- Earnings (Monthly) Card Example --> */}
                                    <div className="col-xl-3 col-md-6 mb-4">
                                        <div className="card border-left-info shadow h-100 py-2">
                                            <div className="card-body">
                                                <div className="row no-gutters align-items-center">
                                                    <div className="col mr-2">
                                                        <div className="text-xs font-weight-bold text-info text-uppercase mb-1">Tasks
                                                        </div>
                                                        <div className="row no-gutters align-items-center">
                                                            <div className="col-auto">
                                                                <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">50%</div>
                                                            </div>
                                                            <div className="col">
                                                                <div className="progress progress-sm mr-2">
                                                                    <div className="progress-bar bg-info a1" role="progressbar"
                                                                    ></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-auto">
                                                        <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/*  <!-- Pending Requests Card Example --> */}
                                    <div className="col-xl-3 col-md-6 mb-4">
                                        <div className="card border-left-warning shadow h-100 py-2">
                                            <div className="card-body">
                                                <div className="row no-gutters align-items-center">
                                                    <div className="col mr-2">
                                                        <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                                            Pending Requests</div>
                                                        <div className="h5 mb-0 font-weight-bold text-gray-800">18</div>
                                                    </div>
                                                    <div className="col-auto">
                                                        <i className="fas fa-comments fa-2x text-gray-300"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/*  <!-- Content Row --> */}
                                <div className="row">
                                    {/*   <!-- Area Chart --> */}
                                    <div className="col-xl-12 col-lg-7">
                                        <div className="card shadow mb-4">
                                            {/*  <!-- Card Header - Dropdown --> */}
                                            <div
                                                className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                                <h6 className="m-0 font-weight-bold text-primary">Earnings Overview</h6>
                                                <div className="dropdown no-arrow">
                                                    <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    </a>
                                                </div>

                                            </div>
                                            <div className="account">
                                                <div className="avt">
                                                    <img src='https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2020/8/21/829850/Bat-Cuoi-Truoc-Nhung-07.jpg'></img>
                                                </div>
                                                <div className="text-1">
                                                    <div className="name-user">
                                                        <h4>Messi</h4>
                                                    </div>
                                                    <div className="content">
                                                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae laudantium nostrum, ipsam dolorem aut ut impedit, asperiores officia necessitatibus, reiciendis quisquam reprehenderit architecto amet inventore fugit iure maiores aperiam voluptas?</p>
                                                    </div>


                                                </div>
                                                <div className="time">
                                                    <p>11 MAY 12:56:59</p>
                                                </div>
                                                <div className="reject">
                                                    <button>Reject</button>
                                                </div>
                                                <div className="approve">
                                                    <button>Approve</button>
                                                </div>
                                            </div>
                                            <div className="line"></div>
                                            <div className="account">
                                                <div className="avt">
                                                    <img src='https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2020/8/21/829850/Bat-Cuoi-Truoc-Nhung-07.jpg'></img>
                                                </div>
                                                <div className="text-1">
                                                    <div className="name-user">
                                                        <h4>Messi</h4>
                                                    </div>
                                                    <div className="content">
                                                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae laudantium nostrum, ipsam dolorem aut ut impedit, asperiores officia necessitatibus, reiciendis quisquam reprehenderit architecto amet inventore fugit iure maiores aperiam voluptas?</p>
                                                    </div>
                                                </div>
                                                <div className="time">
                                                    <p>11 MAY 12:56:59</p>
                                                </div>
                                                <div className="reject">
                                                    <button>Reject</button>
                                                </div>
                                                <div className="approve">
                                                    <button>Approve</button>
                                                </div>
                                            </div>
                                            <div className="line"></div>
                                            <div className="account">
                                                <div className="avt">
                                                    <img src='https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2020/8/21/829850/Bat-Cuoi-Truoc-Nhung-07.jpg'></img>
                                                </div>
                                                <div className="text-1">
                                                    <div className="name-user">
                                                        <h4>Messi</h4>
                                                    </div>
                                                    <div className="content">
                                                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae laudantium nostrum, ipsam dolorem aut ut impedit, asperiores officia necessitatibus, reiciendis quisquam reprehenderit architecto amet inventore fugit iure maiores aperiam voluptas?</p>
                                                    </div>
                                                </div>
                                                <div className="time">
                                                    <p>11 MAY 12:56:59</p>
                                                </div>
                                                <div className="reject">
                                                    <button>Reject</button>
                                                </div>
                                                <div className="approve">
                                                    <button>Approve</button>
                                                </div>
                                            </div>
                                            <div className="card-body">
                                                <div className="chart-area">
                                                    <canvas id="myAreaChart"></canvas>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>
                        <footer className="sticky-footer bg-white">
                            <div className="container my-auto">
                                <div className="copyright text-center my-auto">
                                    <span>Copyright &copy; Your Website 2021</span>
                                </div>
                            </div>
                        </footer>
                        {/* <!-- End of Footer --> */}
                    </div>
                    {/*  <!-- End of Content Wrapper --> */}
                </div>
                {/*  <!-- End of Page Wrapper -->
                                <!-- Scroll to Top Button--> */}
                <a className="scroll-to-top rounded" href="#page-top">
                    <i className="fas fa-angle-up"></i>
                </a>
                {/*  <!-- Logout Modal--> */}
                <div className="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                                <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">Select "Logout" below if you are ready to end your current session.</div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                                <a className="btn btn-primary" >Logout</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthLayout>
    )
}

export default Dashboard;
