const { Reader } = require('nsqjs');

const reader = new Reader('user_topic', 'user_channel', {
    nsqdTCPAddresses: '127.0.0.1:4150'
});

reader.connect();

reader.on('message', msg => {
    const data = msg.body.toString();
    console.log(`Received message: ${data}`);
    msg.finish();
});

reader.on('nsqd_connected', () => {
    console.log('NSQ Reader connected');
});
