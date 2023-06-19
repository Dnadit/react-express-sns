import { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { loginState } from "../atoms";

const Home = () => {
    const [posts, setPosts] = useState([]);
    const isLoggedIn = useRecoilValue(loginState);

    useEffect(() => {
        axiosPosts();
    }, [])

    const axiosPosts = async () => {
        try {
            const res = await axios.get('http://localhost:8080/api/post/getPosts');
            setPosts(res.data);
            console.log(document.cookie);
            console.log(res.data);
            console.log(isLoggedIn);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex justify-center items-center flex-col mt-10">
            {posts.map((post) => (
                <div key={post.id} className="border rounded-lg border-blue-600 w-1/2 mb-5 p-3">
                    <div className="">
                        <div className="text-gray-700 text-lg pb-2">
                            {post.User.nickname}
                        </div>
                        <div className="p-5 bg-gray-300">
                            {post.content}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Home;