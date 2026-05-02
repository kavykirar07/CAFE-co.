const express = require('express');
const app = express();
const server = app.listen(3000, () => console.log('Listening on 3000'));
server.on('error', (e) => console.error('Server error', e));
setTimeout(() => console.log('10 seconds passed'), 10000);
