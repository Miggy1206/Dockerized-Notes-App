const express = require('express');
const noteRouter = express.Router();
const { Note } = require('./models');
const mongoose = require('mongoose');



const validateId = ( req, res, next) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ error: 'Note not found'});
    }

    next();
}








// Create new notebooks: POST '/'
noteRouter.post('/', async (req, res) => {
    try {
        const { title , content } = req.body;
        if (!title || !content){
            return res.status(400).json({ error: 'Title and content fields are required'});
        }

        const note = new Note({ title, content});
        await note.save();
        res.status(201).json({data: note});
    } catch(err){
        res.status(500).json({ error: err.message});
    }
});


//Retrieve all notebooks: GET '/'
noteRouter.get('/', async (req, res) => {
    try{
        const note = await Note.find();
        return res.status(200).json({data: note});

    }catch(err){
        res.status(500).json({error:err.message});
    }
});


//Retrieve a single notebook: GET '/:id'
noteRouter.get('/:id', validateId, async (req, res) => {
    try{  
        const note = await Note.findById(req.params.id);
        if(!note){
            return res.status(404).json({ error: 'Note not found'});
        }
        return res.status(200).json({data: note});

    }catch(err){
        res.status(500).json({error:err.message});
    }
});
//Update a single notebook: PUT '/:id'
noteRouter.put('/:id', validateId, async (req, res) => {
    try{
        const { title, content} = req.body;
        const note = await Note.findByIdAndUpdate(req.params.id, {title, content}, {new: true});
        if(!note){
            return res.status(404).json({ error: 'Note not found'});
        }
        return res.status(200).json({data: note});

    }catch(err){
        res.status(500).json({error:err.message});
    }
});
//Delete a single notebook: DELETE '/:id'
noteRouter.delete('/:id', validateId, async (req, res) => {
    try{
        const note = await Note.findByIdAndDelete(req.params,id);
        if(!note){
            return res.status(404).json({ error: 'Note not found'});
        }
        return res.sendStatus(204);

    }catch(err){
        res.status(500).json({error:err.message});
    }
});









module.exports = {
    noteRouter,
}