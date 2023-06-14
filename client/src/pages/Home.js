import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axiosPosts();
    }, [])

    const axiosPosts = async () => {
        try {
            const res = await axios.get('http://localhost:8080/api/post/getPosts');                        
            setPosts(res.data);
            console.log(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>글 목록</h2>
            <ul>
                {posts.map((post) => (
                    <div key={post.id}>{post.content}</div>
                ))}
            </ul>
        </div>
    );
};

export default Home;