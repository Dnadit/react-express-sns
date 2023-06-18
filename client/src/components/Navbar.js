import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { loginState } from '../atoms';

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);    
    const navigate = useNavigate();    

    const logout = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.get('http://localhost:8080/api/auth/logout', { withCredentials: true });
            setIsLoggedIn(false);
            alert('로그아웃 되었습니다.');
            navigate('/');
        } catch (error) {
            alert('로그아웃 실패하였습니다.');
        };
    };

    const loginLogoutButton = () => {
        if (isLoggedIn) {
            return <span className='text-white text-lg'><button onClick={logout}>로그아웃</button></span>
        } else {
            return <span className='text-white text-lg'><Link to="/login">로그인</Link></span>
        }
    };

    return(
        <div className='bg-gray-800 px-4 flex h-16 items-center justify-between'>
            <div className='ml-10 flex items-baseline space-x-6'>
                <span className='text-white text-lg'><Link to="/">홈</Link></span>
                <span className='text-white text-lg'><Link to="/write">글쓰기</Link></span>            
            </div>
            <div className='mr-10 flex items-baseline space-x-6'>
                {loginLogoutButton()}
                <span className='text-white text-lg'><Link to="/join">회원가입</Link></span>
            </div>
        </div>
    );
};

export default Navbar;