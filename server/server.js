const app = require('./app');

app.listen(process.env.PORT, (req, res) => {
    console.log(process.env.PORT, '번 포트에서 대기중');
});