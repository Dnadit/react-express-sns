import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return(
        <div className='nav-bar'>
            <span className='nav-link'><Link to="/">홈</Link></span>
            <span className='nav-link'><Link to="/write">글쓰기</Link></span>
        </div>
    );
};

export default Navbar;