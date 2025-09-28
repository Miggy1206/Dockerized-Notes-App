const express = require('express');
const notebookRouter = express.Router();
const { Notebook } = require('./models');
const mongoose = require('mongoose');



const validateId = ( req, res, next) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ error: 'Notebook not found'});
    }

    next();
}








// Create new notebooks: POST '/'
notebookRouter.post('/', async (req, res) => {
    try {
        const { name , description } = req.body;
        if (!name){
            return res.status(400).json({ error: 'Name is required'});
        }

        const notebook = new Notebook({ name, description});
        await notebook.save();
        res.status(201).json({data: notebook});
    } catch(err){
        res.status(500).json({ error: err.message});
    }
});


//Retrieve all notebooks: GET '/'
notebookRouter.get('/', async (req, res) => {
    try{
        const notebooks = await Notebook.find();
        return res.status(200).json({data: notebooks});

    }catch(err){
        res.status(500).json({error:err.message});
    }
});


//Retrieve a single notebook: GET '/:id'
notebookRouter.get('/:id', validateId, async (req, res) => {
    try{  
        const notebook = await Notebook.findById(req.params.id);
        if(!notebook){
            return res.status(404).json({ error: 'Notebook not found'});
        }
        return res.status(200).json({data: notebook});

    }catch(err){
        res.status(500).json({error:err.message});
    }
});
//Update a single notebook: PUT '/:id'
notebookRouter.put('/:id', validateId, async (req, res) => {
    try{
        const { name, description} = req.body;
        const notebook = await Notebook.findByIdAndUpdate(req.params.id, {name, description}, {new: true});
        if(!notebook){
            return res.status(404).json({ error: 'Notebook not found'});
        }
        return res.status(200).json({data: notebook});

    }catch(err){
        res.status(500).json({error:err.message});
    }
});
//Delete a single notebook: DELETE '/:id'
notebookRouter.delete('/:id', validateId, async (req, res) => {
    try{
        const notebook = await Notebook.findByIdAndDelete(req.params,id);
        if(!notebook){
            return res.status(404).json({ error: 'Notebook not found'});
        }
        return res.sendStatus(204);

    }catch(err){
        res.status(500).json({error:err.message});
    }
});









module.exports = {
    notebookRouter,
}