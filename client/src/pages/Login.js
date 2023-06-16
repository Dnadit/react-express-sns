const Login = () => {
    return(
        <form>
            <label>
                아이디
            <input type="text" />
            </label>
            <label>
                비밀번호
            <input type="password" />
            </label>
            <button type="submit">로그인</button>
        </form>
    );
};

export default Login;