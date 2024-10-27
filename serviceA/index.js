const express = require('express');
const bodyParser = require('body-parser');
const { Writer } = require('nsqjs');

const app = express();
const writer = new Writer('127.0.0.1', 4150); // alamat NSQ

app.use(bodyParser.json());

writer.connect();

writer.on('ready', () => {
    console.log('NSQ Writer is ready');
});

app.post('/user', (req, res) => {
    const { fullname } = req.body;
    if (!fullname) {
        return res.status(400).json({ error: 'fullname is required' });
    }

    writer.publish('user_topic', { fullname });

    res.status(200).json({ message: 'User fullname published' , data : fullname});
});

app.listen(3001, () => {
    console.log('Service A listening on port 3001');
});
