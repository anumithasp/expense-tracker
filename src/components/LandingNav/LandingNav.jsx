import React from 'react';
import './LandingNav.css';

const LandingNav = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top">
        <div className="container-fluid">
            <div>
                <img src="ayoola_blue.png" alt="Ayoola Logo" style={{height: 45}} className='px-3'/>
            </div>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className='d-flex align-items-center justify-content-end'>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item pl-pr-15 pt-1">
                            <a className="nav-link exp-link" aria-current="page" href="#about-us">About Us</a>
                        </li>
                        <li className="nav-item pl-pr-15 pt-1">
                            <a className="nav-link exp-link" href="#services">Services</a>
                        </li>
                        <li className="nav-item pl-pr-15 pt-1">
                            <a className="nav-link exp-link" href="#customer-care">Customer Care</a>
                        </li>
                        <li className="nav-item pl-pr-15">
                            <a className="nav-link" href="/login">
                                <button className='btn btn-outline-primary exp-btn-outline'>Sign In</button>
                            </a>
                        </li>
                        <li className="nav-item pl-pr-15">
                            <a className="nav-link" href="/signup">
                                <button className='btn btn-primary exp-btn-primary'>Sign Up</button>
                            </a>
                        </li>
                    </ul>
                </div>
                
            </div>
        </div>
    </nav>
  )
}

export default LandingNav
