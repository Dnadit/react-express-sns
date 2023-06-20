import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { loginState } from "../atoms";

const Write = () => {
    const [content, setContent] = useState('');
    const navigate = useNavigate();
    const isLoggedIn = useRecoilValue(loginState);
    const location = useLocation();

    useEffect(() => {
        console.log(location);
        if (location.state) {
            setContent(location.state.postContent);
        };
    }, [])

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isLoggedIn) {
            alert('먼저 로그인 해주세요.');
            navigate('/login');
        };
        if (location.state) {
            try {
                const res = await axios.patch('http://localhost:8080/api/post/updatePost', {
                    content: content,
                    postId: location.state.postId,
                }, { withCredentials: true });
                if (res.status === 200) {
                    alert('글이 수정되었습니다');
                    navigate('/');
                } else {
                    alert('글 수정 실패');
                };
            } catch (error) {
                console.error(error);
            };
        } else {
            try {
                const res = await axios.post('http://localhost:8080/api/post/insert', {
                    content: content,
                }, { withCredentials: true });
                if (res.status === 200) {
                    alert('글 등록이 되었습니다');
                    navigate('/');
                } else {
                    alert('글 등록 실패');
                };
            } catch (error) {
                console.error(error);
            };
        };
    };

    return (
        <div className="m-10 flex flex-col items-center">
            <h2 className="text-base font-semibold leading-7 text-gray-900 my-3">글 쓰기</h2>
            <form onSubmit={handleSubmit} className="w-2/5" >
                <textarea
                    value={content}
                    onChange={handleContentChange}
                    rows={4}
                    className="block w-full h-52 rounded-md border-0 p-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <button type="submit" className="float-right rounded-md bg-blue-500 px-3 py-2 font-semibold text-white my-3">글 등록</button>
            </form>
        </div>
    );
};

export default Write;