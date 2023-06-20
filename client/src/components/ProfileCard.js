import axios from "axios";

const ProfileCard = (props) => {
    const clickToMyPosts = async (e) => {
        e.preventDefault();
        const res = await axios.get('http://localhost:8080/api/post/getMyPosts', { withCredentials: true });
        props.setPosts(res.data);
    };

    const clickToAllPosts = (e) => {
        e.preventDefault();
        props.setPosts([]);
    };

    return (
        <div className="mt-10 flex flex-col items-center">
            <p>반갑습니다. <span className="text-blue-800">{props.nickname}</span>님</p>
            <button onClick={clickToMyPosts} className="bg-blue-400 hover:bg-blue-600 text-white py-1 rounded-lg mt-2 w-36">내가 쓴 글 보기</button>
            <button onClick={clickToAllPosts} className="bg-blue-400 hover:bg-blue-600 text-white py-1 rounded-lg mt-2 w-36">모든 글 보기</button>
        </div>
    );
};

export default ProfileCard;