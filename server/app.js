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
const helmet = require('helmet');
const hpp = require('hpp');

dotenv.config();
const postRouter = require('./routes/post');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const commentRouter = require('./routes/comment');

const app = express();
passportConfig();
sequelize.sync({ force: false })
    .then(() => {
        console.log('DB연결 성공');
    })
    .catch((err) => {
        console.error(err);
    });

const sessionOption = {
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
};

if (process.env.NODE_ENV === 'production') {
    app.use(morgan('combined'));
    app.use(helmet({
        contentSecurityPolicy: false,
        crossOriginEmbedderPolicy: false,
        crossOriginResourcePolicy: false,
    }));
    app.use(hpp());
} else {
    app.use(morgan('dev'));
}
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '../client/build')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session(sessionOption));
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use(cors({
    origin: ['http://localhost', 'http://localhost:3000'],
    credentials: true,
}));
app.use('/api/post', postRouter);
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/comment', commentRouter);

app.get('/', (req, res) => {    
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터를 찾을 수 없습니다.`);
    error.status = 404;
    next(error);
});
app.use((err, req, res, next) => {
    res.status = (err.status || 500);
    return res.json({
        message: err.message,
    });
});

module.exports = app;