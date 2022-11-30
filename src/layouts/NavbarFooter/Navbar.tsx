import { NavLink } from "react-router-dom"

export const Navbar = () => {
    return (
        <nav className='navbar navbar-expand-lg navbar-dark main-color shadow'> 
            <a className='navbar-brand' href='https://www.egosanto.de' target='_blank'>
                <img 
                    src={require("./../../Images/PublicImages/sun.png")} 
                    width="35" 
                    height="35" 
                    className="d-inline-block align-top" alt="" />&nbsp;
                <b>egosanto</b>
            </a>
            <button 
                className='navbar-toggler' 
                type='button' 
                data-bs-toggle='collapse' 
                data-bs-target='#navbarNavDropdown' 
                aria-controls='navbarNavDropdown' 
                aria-expanded='false' 
                aria-label='Toggle Navigation'
            >
                <span className='navbar-toggler-icon'></span>
            </button>
            <div className='collapse navbar-collapse' id='navbarNavDropdown'>
                <ul className='navbar-nav mr-auto'>
                    <li className='nav-item'>
                        <NavLink className='nav-link' to={"/home"}>Home</NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink className='nav-link' to={'/search'}>Search Books</NavLink>
                    </li>
                </ul>
                <ul className='navbar-nav ms-auto'>
                    <li className='nav-item m-1'>
                        <a type='button' className='btn btn-outline-light shadow' href='#'>Sign in</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}