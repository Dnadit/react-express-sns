import { useRecoilState, useRecoilValue } from "recoil";
import { LoggedInNickname, loginState } from "../atoms";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const loggingNickname = useRecoilValue(LoggedInNickname);
    const [nickname, setNickname] = useRecoilState(LoggedInNickname);
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
    const [newNickname, setNewNickname] = useState(loggingNickname);
    const [newPassword, setNewPassword] = useState('');
    const navigate = useNavigate();

    const changeNick = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8080/api/user/changeNick', {
                nickname: loggingNickname,
                newNickname: newNickname,                
            }, { withCredentials: true });
            if (res.status === 200) {
                alert('닉네임이 변경되었습니다');                
                setNickname(newNickname);
            };
        } catch (error) {
            console.error(error);
            alert('닉네임 변경 실패');
        }
    };

    const changePassword = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8080/api/user/changePassword', {
                nickname: loggingNickname,
                newPassword: newPassword,
            }, { withCredentials: true });
            if (res.status === 200) {
                alert('비밀번호가 변경되었습니다');                
            };
        } catch (error) {
            console.error(error);
            alert('비밀번호 변경 실패');
        }
    };

    const withdraw = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.delete('http://localhost:8080/api/user/withdraw', { withCredentials: true });
            if (res.status === 200) {
                alert('회원탈퇴 완료');
                setIsLoggedIn(false);
                setNickname('');   
                navigate('/');
            };
        } catch (error) {
            console.error(error);
            alert('회원탈퇴 실패');
        }
    };

    return (
        <div className="bg-blue-200 w-1/3 mx-auto mt-10 p-5 h-52">
            <div className="flex flex-col mb-12">
                <label className="mb-2">
                    <input type="text" value={newNickname} onChange={(e) => setNewNickname(e.target.value)} className="h-7 px-1" />
                    <button onClick={changeNick} className="ml-3 px-1 h-7 rounded-md bg-blue-400 text-white">닉네임 변경</button>
                </label>
                <label className="mb-2">
                    <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="h-7 px-1" />
                    <button onClick={changePassword} className="ml-3 px-1 h-7 rounded-md bg-blue-400 text-white">비밀번호 변경</button>
                </label>
            </div>
            <div className="flex justify-end">
                <button onClick={withdraw} className="w-32 flex justify-center p-2 rounded-md bg-gray-800 text-white">회원탈퇴</button>
            </div>
        </div>
    );
};

export default Profile;