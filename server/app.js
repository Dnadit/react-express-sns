const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const dotenv = require('dotenv');
const morgan = require('morgan');
const session = require('express-session');
const passport = require('passport');
const { sequelize } = require('./models');
const passportConfig = require('./passport');

dotenv.config();
const postRouter = require('./routes/post');
const authRouter = require('./routes/auth');

const app = express();
passportConfig();
sequelize.sync({ force: false })
    .then(() => {
        console.log('DB연결 성공');
    })
    .catch((err) => {
        console.error(err);
    });
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
}));
app.use(passport.initialize());
app.use(passport.session());
    
// routes
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use('/api/post', postRouter);
app.use('/api/auth', authRouter);

app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터를 찾을 수 없습니다.`);
    error.status = 404;
    next(error);
});
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = err;
    res.status = (err.status || 500);
    console.log(res.status);
    res.status(res.status).json({        
        message: err.message,    
    });
});

app.listen(process.env.PORT, (req, res) => {
    console.log(process.env.PORT, '번 포트에서 대기중');
});