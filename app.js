const express = require('express');

const app = express();

// Index Route
app.get('/', (req, res) => {
    res.send('index');
});

// About Route
app.get('/about', (req, res) => {
    app.send('About!');
});


const port = 5000;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});