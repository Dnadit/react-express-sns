import ProfileCard from "../components/ProfileCard";
import Posts from "../components/Posts";
import { useRecoilValue } from "recoil";
import { LoggedInNickname } from "../atoms";
import { useState } from "react";

const Main = () => {
    const nickname = useRecoilValue(LoggedInNickname);
    const [posts, setPosts] = useState([]);

    return(
        <>
        { nickname && <ProfileCard nickname={nickname} setPosts={setPosts} /> }
        <Posts posts={posts} />
        </>
    );
};

export default Main;