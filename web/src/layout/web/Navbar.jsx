import { NavLink } from 'react-router-dom'
// import { useSelector } from 'react-redux'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { Avatar } from '@mui/material';
import "./style.css"
const Navbar = () => {
    // const state = useSelector(state => state.handleCart)
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 sticky-top">
            <div className="container">
                <NavLink className="navbar-brand fw-bold fs-4 px-2" to="/home">DUCPRO</NavLink>
                <button className="navbar-toggler mx-2" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav m-auto my-2 text-center">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/home">Home </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/product">Products</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/about">About</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/contact">Contact</NavLink>
                        </li>
                    </ul>
                    <div className="buttons text-center d-flex">
                        <NavLink to="/login" className="btn btn-outline-dark m-2"><LogoutIcon/> Login</NavLink>
                        <NavLink to="/register" className="btn btn-outline-dark m-2"><PersonAddAltIcon/> Register</NavLink>
                        <NavLink to="/cart" className="btn btn-outline-dark m-2"><ShoppingCartIcon /> Cart </NavLink>
                        <NavLink to="/profile" className="btn btn-outline-dark d-flex align-items-center m-2"
                        ><Avatar
                            sx={{
                                width:28,
                                height: 28,
                                marginRight: 1
                            }} alt="Remy Sharp" src="/static/images/avatar/1.jpg" /> profile</NavLink>
                    </div>
                </div>


            </div>
        </nav>
    )
}

export default Navbar