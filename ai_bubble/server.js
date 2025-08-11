// server.js
const express = require('express');
const path = require('path');
const app = express();
const chatApi = require('./backend');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/chat', chatApi);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
