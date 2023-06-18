import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { loginState } from "../atoms";

const Write = () => {
    const [content, setContent] = useState('');
    const navigate = useNavigate();
    const isLoggedIn = useRecoilValue(loginState);

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isLoggedIn) {
            alert('먼저 로그인 해주세요.');
            navigate('/login');
        };
        axios.post('http://localhost:8080/api/post/insert', {
            content: content,
        }, { withCredentials: true })
            .then((res) => {
                console.log(res);
                navigate('/');
            })
            .catch((err) => {
                console.error(err);
                setContent('');
            });
    };

    return (
        <div className="m-10">
            <h2 className="text-base font-semibold leading-7 text-gray-900 my-3">글 쓰기</h2>
            <form onSubmit={handleSubmit} >
                <textarea
                    value={content}
                    onChange={handleContentChange}                    
                    rows={4}
                    className="block w-2/5 rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <button type="submit" className="rounded-md bg-blue-500 px-3 py-2 font-semibold text-white my-3">글 등록</button>
            </form>
        </div>
    );
};

export default Write;