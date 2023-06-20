import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginState, LoggedInNickname } from "../atoms";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
    const [userNickname, setUserNickname] = useRecoilState(LoggedInNickname);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8080/api/auth/login', {
                email: email,
                password: password,
            }, { withCredentials: true });  
            setIsLoggedIn(true);
            setUserNickname(res.data.nickname);
            alert(`반갑습니다. ${res.data.nickname}님!`);
            navigate('/');
        } catch (error) {                           
            alert('이메일 또는 비밀번호가 틀립니다.');
            setPassword('');
        };
    };

    return (
        <div className="bg-blue-200 w-1/3 mx-auto mt-10 h-96 flex flex-col justify-center items-center">
            <h2 className="mb-5 font-semibold text-2xl">로그인</h2>
            <form onSubmit={submitHandler} >
                <div className="flex flex-col items-start">
                    <input type="text" value={email} placeholder="email" onChange={(e) => setEmail(e.target.value)} className="border-2 border-gray-500 h-10 mb-3" />
                    <input type="password" value={password} placeholder="password" onChange={(e) => setPassword(e.target.value)} className="border-2 border-gray-500 h-10 mb-3" />
                    <button type="submit" className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-2 font-semibold text-white">로그인</button>
                </div>
            </form>
        </div>
    );
};

export default Login;