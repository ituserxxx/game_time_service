const express = require('express');
const fs = require('fs');
const moment = require('moment');  // 用于格式化日志时间
const app = express();
const port = 7330;

// 日志文件路径
const logFilePath = 'request_logs.txt';
// 创建一个中间件来记录日志
app.use((req, res, next) => {
    // 获取请求的 IP 地址
    const ip = req.ip || req.connection.remoteAddress;

    // 获取查询参数 id
    const { id } = req.query;

    // 获取当前时间
    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');

    // 构建日志内容
    const logMessage = `${timestamp} - IP: ${ip} - ID: ${id}\n`;

    // 写入日志文件
    fs.appendFile(logFilePath, logMessage, (err) => {
        if (err) {
            console.error('Error writing to log file', err);
        }
    });

    // 继续处理请求
    next();
});

// 处理 GET 请求，返回 id 参数是否为 '123'
app.get('/', (req, res) => {
    const { id } = req.query;

    // 根据 id 返回 true 或 false
    return res.json({ result: id });
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening at http://0.0.0.0:${port}`);
});

// https://supreme-space-dollop-q6pqrx7ggw9c9vv5-7330.app.github.dev/?id=3
