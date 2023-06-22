import { useEffect, useState } from "react";
import { FaRegComment, FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { LoggedInNickname } from "../atoms";
import api from "../config/api";

const Comment = (props) => {
    const [comments, setComments] = useState([]);
    const loginNickname = useRecoilValue(LoggedInNickname);

    useEffect(() => {
        getComments();
    }, [props.insertComment]);

    const getComments = async () => {
        const res = await api.get('/api/comment/getComments', {
            params: {
                postId: props.postId,
            },
        });
        if (res.status === 200) {
            setComments(res.data);
        }
    };  

    const deleteButton = (nickname, commentId) => {
        if (loginNickname === nickname) {
            return <div>
                <FaTrashAlt size="14" onClick={(e) => deleteComment(e, commentId)} className="hover:text-red-600 ml-1.5" />                                
            </div>
        };
    };

    const deleteComment = async (e, commentId) => {
        e.preventDefault();
        try {
            const res = await api.delete('/api/comment/deleteComment', {
                params: { id: commentId },
                withCredentials: true,
            });
            if (res.status === 200) {
                alert('댓글이 삭제 되었습니다');
                getComments();               
            };
        } catch (error) {
            console.error(error);
            alert('댓글 삭제 실패');
        }
    };    

    return (
        <div>
            <div className="mt-2 flex items-center">
                <FaRegComment size="20" className="mr-1.5" />
                <span className="font-thin text-sm">{comments.length}</span>
            </div>
            {comments.map((comment) => {
                return (                    
                    <div key={comment.id} className="flex items-center pt-2">
                        <span className="mr-2 font-bold">{comment.User?.nickname ?? 'unknown'}</span>
                        <div style={{ whiteSpace: 'pre-line' }} className="ml-1 font-light text-sm">{comment.content}</div>
                        {deleteButton(comment.User?.nickname, comment.id)}                                                
                    </div>                    
                );
            })}
        </div>
    );
};

export default Comment;