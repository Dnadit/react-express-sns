import { useEffect, useState } from "react";
import axios from "axios";
import InputComment from "./InputComment";
import Comment from "./Comment";
import { useRecoilValue } from "recoil";
import { LoggedInNickname, loginState } from "../atoms";
import { useNavigate } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";

const Posts = (props) => {
    const [posts, setPosts] = useState([]);
    const [insertComment, setInsertComment] = useState(false);
    const loggedInNick = useRecoilValue(LoggedInNickname);
    const isLoggedIn = useRecoilValue(loginState);
    const navigate = useNavigate();

    useEffect(() => {
        axiosPosts();
    }, [props.posts]);

    const axiosPosts = async () => {
        try {
            const res = await axios.get('http://localhost:8080/api/post/getPosts');
            if (props.posts.length === 0) {
                setPosts(res.data);
            } else {
                setPosts(props.posts);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const updateDeleteButton = (nickname, postId, postContent) => {
        if (nickname === loggedInNick) {
            return <div>
                <button onClick={(e) => toUpdatePost(e, postId, postContent)}>수정</button>
                <button onClick={(e) => deletePost(e, postId)} className="ml-2">삭제</button>
            </div>
        }
    };

    const deletePost = async (e, postId) => {
        e.preventDefault();
        try {
            const res = await axios.delete('http://localhost:8080/api/post/deletePost', {
                params: { id: postId },
                withCredentials: true,
            });
            if (res.status === 200) {
                alert('글이 삭제 되었습니다');
                axiosPosts();               
            };
        } catch (error) {
            console.error(error);
            alert('글 삭제 실패');
        }
    };

    const toUpdatePost = (e, postId, postContent) => {
        e.preventDefault();
        navigate('/write', { state: { postContent: postContent, postId: postId } });
    };   

    return (
        <div className="flex justify-center">
            <div className="w-1/2 flex justify-center items-center flex-col mt-10">
                {posts.map((post) => {                
                    return (
                    <div key={post.id} className="border rounded-lg border-blue-600 w-1/2 mb-5 p-3">
                        <div className="flex justify-between">
                            <div className="flex items-center pb-1.5">
                                <FaUserAlt size="18" />
                                <span className="text-gray-700 text-lg ml-1.5">{post.User?.nickname ?? 'unknown'}</span>
                            </div>
                            {updateDeleteButton(post.User?.nickname, post.id, post.content)}
                        </div>
                        <div style={{ whiteSpace: 'pre-line' }} className="p-5 border-dashed border-y border-slate-400">
                            {post.content}
                        </div>
                        { isLoggedIn && <InputComment postId={post.id} insertComment={insertComment} setInsertComment={setInsertComment} /> }
                        <Comment postId={post.id} insertComment={insertComment} />
                    </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Posts;