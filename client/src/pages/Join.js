import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Join = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8080/api/auth/join', {                
                email: email,
                password: password,
                nickname: nickname,
            });
            if (res.status === 200) {
                navigate('/');
            } else {
                return new Error('회원가입 실패');
            }
        } catch (error) {
            console.error(error);
            alert('회원가입에 실패했습니다.');
        }

    };

    return (
        <div className="bg-blue-200 w-1/3 mx-auto mt-10 h-96 flex flex-col justify-center items-center">
            <h2 className="mb-5 font-semibold text-2xl">회원가입</h2>
            <form onSubmit={submitHandler} >
                <div className="flex flex-col items-start">                                                 
                    <input type="text" value={email} placeholder="email" onChange={(e) => setEmail(e.target.value)} className="border-2 border-gray-500 h-10 mb-3" />            
                    <input type="password" value={password} placeholder="password" onChange={(e) => setPassword(e.target.value)} className="border-2 border-gray-500 h-10 mb-3" />
                    <input type="text" value={nickname} placeholder="닉네임" onChange={(e) => setNickname(e.target.value)} className="border-2 border-gray-500 h-10 mb-3" />
                    <button type="submit" className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-2 font-semibold text-white">회원가입</button>
                </div>
            </form>
        </div>
    );
};

export default Join;