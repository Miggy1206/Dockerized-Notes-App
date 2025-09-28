const express = require('express');

const app = express();

app.get('/',(req,res) => res.json({ message: 'Hello from notes' }));

app.listen(3001, () => {
    console.log('Notebooks server listening on port 3001');
});