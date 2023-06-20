import axios from "axios";
import { useState } from "react";

const InputComment = (props) => {
    const [content, setContent] = useState();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8080/api/comment/insert', {
                content: content,
                postId: props.postId,
            }, { withCredentials: true });                     
        } catch (error) {
            console.error(error);
        };
    };

    return(
        <div>
            <form onSubmit={submitHandler} className="flex flex-col">
                <textarea 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="댓글을 등록해주세요" 
                className="mt-2 block w-full h-14 rounded-md border-0 p-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-indigo-600 sm:text-sm"></textarea>                
                <button type="submit" className="mt-1 p-1 ml-auto w-16 items-end rounded-md border-0 bg-blue-400 text-white">등록</button>
            </form>
        </div>
    );
};

export default InputComment;