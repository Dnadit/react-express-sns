import { useState } from "react";
import axios from "axios";

const Write = () => {
    const [content, setContent] = useState('');

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/api/post/insert', {
            content: content,
        })
            .then((res) => {
                console.log(res);
                console.log('글이 작성되었습니다:', content);
            })
            .catch((err) => {
                console.error(err);
            });
        setContent('');
    };

    return (
        <div>
            <h2>글 쓰기 폼</h2>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={content}
                    onChange={handleContentChange}                    
                    rows={4}
                />
                <button type="submit">글 올리기</button>
            </form>
        </div>
    );
};

export default Write;