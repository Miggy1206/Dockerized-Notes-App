const express = require('express');

const app = express();

app.get('/',(req,res) => res.json({ message: 'Hello from notebooks' }));

app.listen(3000, () => {
    console.log('Notebooks server listening on port 3000');
});