const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const dotenv = require('dotenv');
const morgan = require('morgan');
const { sequelize } = require('./models');

dotenv.config();

const postRouter = require('./routes/post');

const app = express();

sequelize.sync({ froce: false })
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
    
// routes
app.use(cors());
app.use('/api/post', postRouter);

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
    res.json({
        code: res.status,
        message: err.message,    
    });
});

app.listen(process.env.PORT, (req, res) => {
    console.log(process.env.PORT, '번 포트에서 대기중');
});