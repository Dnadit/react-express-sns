import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Join = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        try {
            axios.post('http://localhost:8080/api/auth/join', {                
                email: email,
                password: password,
                nickname: nickname,
            })
            navigate('/');
        } catch (error) {
            console.error(error);
            alert('회원가입에 실패했습니다.');
        }

    };

    return (
        <form onSubmit={submitHandler}>
            <label>
                아이디
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label>
                비밀번호
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <label>
                닉네임
                <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} />
            </label>
            <button type="submit">회원가입</button>
        </form>
    );
};

export default Join;