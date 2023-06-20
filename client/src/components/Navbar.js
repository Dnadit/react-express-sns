import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { LoggedInNickname, loginState } from '../atoms';

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);   
    const [nickname, setNickname] = useRecoilState(LoggedInNickname);
    const navigate = useNavigate();    

    const logout = async (e) => {
        e.preventDefault();
        try {
            await axios.get('http://localhost:8080/api/auth/logout', { withCredentials: true });
            setIsLoggedIn(false);
            setNickname('');
            alert('로그아웃 되었습니다.');
            navigate('/');
        } catch (error) {
            alert('로그아웃 실패하였습니다.');
        };
    };

    const loginLogoutButton = () => {
        if (isLoggedIn) {
            return <span className='text-sky-700 text-lg'><button onClick={logout}>로그아웃</button></span>
        } else {
            return <span className='text-sky-700 text-lg'><Link to="/login">로그인</Link></span>
        }
    };

    const joinProfileButton = () => {
        if (isLoggedIn) {
            return <span className='text-sky-700 text-lg'><Link to="/profile">내정보</Link></span>
        } else {
            return <span className='text-sky-700 text-lg'><Link to="/join">회원가입</Link></span>
        }
    };

    const writeClick = (e) => {
        if (!isLoggedIn) {
            e.preventDefault();
            alert('로그인 해주세요.');
            navigate('/login');
        };
    };

    return(
        <div className='px-4 flex h-16 items-center justify-between border-b-4'>
            <div className='ml-10 flex items-baseline space-x-6'>
                <span className='text-sky-700 text-lg'><Link to="/">홈</Link></span>
                <span className='text-sky-700 text-lg'><Link to="/write" onClick={writeClick}>글쓰기</Link></span>            
            </div>
            <div className='mr-10 flex items-baseline space-x-6'>
                {loginLogoutButton()}
                {joinProfileButton()}
            </div>
        </div>
    );
};

export default Navbar;