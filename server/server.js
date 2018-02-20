const express = require('express');
const path = require('path');

const app = express();
app.use('/static', express.static(path.join(__dirname, 'static')));

app.get('*', (req, res) => res.sendFile(path.join(__dirname, './index.html')));

app.listen(80, () => { console.log('Launched on 30'); });
