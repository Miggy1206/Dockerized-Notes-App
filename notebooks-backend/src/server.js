const express = require('express');
const mongoose = require('mongoose');
const { notebookRouter } = require('./routes');
const bodyParser = require('body-parser');


const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use('/api/notebooks',notebookRouter);


mongoose
.connect(process.env.DB_URL)
    .then(() => {
        console.log('Connected to MongoDB. Starting server.');

        app.listen(port, () => {
            console.log(`Notebooks server listening on port ${port}`);
        });


    })
    .catch((err) => {
        console.error('Something went wrong!');
        console.error(err);
    });
