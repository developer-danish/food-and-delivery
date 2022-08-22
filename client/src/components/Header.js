import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated, logout } from '../helpers/auth';
import { Button } from '@mui/material';
import "./Header.css";

const Header = () => {
    const navigate = useNavigate();

    const handleLogout = (evt) => {
        logout(() => {
            navigate("/signin");
        });
    }
    const showNavigation = () => (
        <nav className="navbar navbar-expand-lg bg-warning " >
            <div className="container-fluid ">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <Link to="/" className="navbar-brand" >Logo</Link>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 " >
                        {
                            !isAuthenticated() && (
                                <>
                                    <li className="nav-item">
                                        <Link to="/" className="nav-link active" aria-current="page" >
                                            {/* <i class="fas fa-home"></i>*/}Home
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/shop" className="nav-link" aria-current="page" >
                                            <i class="fas fa-shopping-bag"></i> Shop
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/signin" className="nav-link active" aria-current="page" >Signin</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/signup" className="nav-link">Signup</Link>
                                    </li>
                                </>
                            )

                        }

                        {
                            isAuthenticated() && isAuthenticated().role === 1 && (
                                <>
                                    <li className="nav-item">
                                        <Link to="/admin/dashboard" className="nav-link">Dashboard</Link>
                                    </li>
                                </>
                            )
                        }

                        {
                            isAuthenticated() && isAuthenticated().role === 0 && (
                                <>
                                    <li className="nav-item">
                                        <Link to="/user/dashboard" className="nav-link">Dashboard</Link>
                                    </li>
                                </>
                            )
                        }

                        {
                            isAuthenticated() && (
                                <>
                                    <li className="nav-item">
                                        <button onClick={handleLogout} className="btn btn-link text-secondary text-decoration-none px-0">Logout</button>
                                        {/* <Button onClick={handleLogout}  className="text-secondary" variant="text">Logout</Button> */}
                                    </li>
                                </>
                            )
                        }

                    </ul>
                </div>
            </div>
        </nav >
    );
    return (
        <header>{showNavigation()}</header>
    );
};

export default Header;