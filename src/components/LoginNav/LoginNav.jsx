import React from 'react';
import AddExpenseModal from '../AddExpenseModal/AddExpenseModal';
import AddIncomeModal from '../AddIncomeModal/AddIncomeModal';

const LoginNav = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top">
        <div className="container-fluid">
            <div>
                <img src="ayoola_blue.png" alt="Ayoola Logo" style={{height: 45}} className='px-3'/>
            </div>
            <button className="nav navbar-toggler justify-content-end" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className='d-flex justify-content-end'>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item pl-pr-15 pt-1">
                            <a className="nav-link exp-link" aria-current="page" href="/dashboard">Dashboard</a>
                        </li>
                        <li className="nav-item pl-pr-15 pt-1">
                            <a className="nav-link exp-link" href="/insights">Insights</a>
                        </li>
                        <li className="nav-item pl-pr-15">
                            <AddExpenseModal />
                        </li>
                        <li className="nav-item pl-pr-15">
                            <AddIncomeModal />
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Profile
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#">Action</a></li>
                                <li><a className="dropdown-item" href="#">Another action</a></li>
                                <li><a className="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
                
            </div>
        </div>
    </nav>
  )
}

export default LoginNav


