const express = require('express');
const notebookRouter = express.Router();

notebookRouter.get('/', (req, res) => {
    res.json({ message: 'Hello from notebooks'});
});


module.exports = {
    notebookRouter,
}