import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Join = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();

        if (password === confirmPassword) {
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
        } else {
            alert('비밀번호가 일치하지 않습니다.');
            setPassword('');
            setConfirmPassword('');
        }  
    };

    const emailCheck = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.get('http://localhost:8080/api/user/emailCheck', { 
                params: { 
                    email: email,
                },
            });
            if (res.status === 400) {
                alert('이메일 중복입니다.');
                setEmail('');
            } else {
                alert('사용가능한 이메일 입니다.');
            };
        } catch (error) {
            console.error(error);
            alert('이메일 중복입니다.');
            setEmail('');
        };
    };

    const nicknameCheck = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.get('http://localhost:8080/api/user/nicknameCheck', { 
                params: { 
                    nickname: nickname,
                },
            });
            if (res.status === 400) {
                alert('닉네임 중복입니다.');
                setNickname('');
            } else {
                alert('사용가능한 닉네임 입니다.');
            };
        } catch (error) {
            console.error(error);
            alert('닉네임 중복입니다.');
            setNickname('');
        };
    };

    return (
        <div className="bg-blue-200 w-1/3 mx-auto mt-10 h-96 flex flex-col justify-center items-center">
            <h2 className="mb-5 font-semibold text-2xl">회원가입</h2>
            <form onSubmit={submitHandler} >
                <div className="flex flex-col items-start">                                                 
                    <label>
                    <input type="text" value={email} placeholder="email" onChange={(e) => setEmail(e.target.value)} className="border-2 border-gray-500 h-10 mb-3" />            
                    <button onClick={emailCheck} className="rounded-md bg-blue-400 px-1 mx-1 h-10 text-white">중복확인</button>
                    </label>
                    <input type="password" value={password} placeholder="password" onChange={(e) => setPassword(e.target.value)} className="border-2 border-gray-500 h-10 mb-3" />
                    <input type="password" value={confirmPassword} placeholder="password confirm" onChange={(e) => setConfirmPassword(e.target.value)} className="border-2 border-gray-500 h-10 mb-3" />
                    <label>
                    <input type="text" value={nickname} placeholder="닉네임" onChange={(e) => setNickname(e.target.value)} className="border-2 border-gray-500 h-10 mb-3" />
                    <button onClick={nicknameCheck} className="rounded-md bg-blue-400 px-1 mx-1 h-10 text-white">중복확인</button>
                    </label>
                    <button type="submit" className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-2 font-semibold text-white">회원가입</button>
                </div>
            </form>
        </div>
    );
};

export default Join;