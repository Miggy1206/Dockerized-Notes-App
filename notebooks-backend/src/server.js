const express = require('express');

const app = express();
const port = process.env.PORT;
app.get('/',(req,res) => res.json({ message: 'Hello from notebooks' }));

app.listen(port, () => {
    console.log(`Notebooks server listening on port ${port}`);
});