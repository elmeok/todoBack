const express = require('express');
const Todo = require('../models/todo')
const router = new express.Router();

router.post('/todos', async (req,res,next) => {
    const todo = new Todo(req.body);
    todo.status = "todo";
    try{
        const saveTodo = await todo.save();
        res.status(201).send(saveTodo);
    }catch(e){
        res.status(400).send(e);
    }
});

router.get('/todos', async (req,res,next) => {
    try{
        const todos = await Todo.find({});
        res.send(todos);
    } catch (e){
        res.status(500).send(e);
    }
});

router.get('/todos/:id', async (req,res,next) => {
    const todoId = req.params.id;
    
    try{
        const todo = await Todo.findById(todoId);
        if(!todo) return res.status(404).send('Todo not found');
        res.send(todo);
    } catch (e){
        res.status(500).send(e);
    }

});

router.patch('/todos/:id', async (req,res,next) => {
    const todoId = req.params.id;
    console.log(todoId);
    try{
        const todo = await Todo.findByIdAndUpdate(todoId, req.body, {
            new : true,
            runValidators : true
        });
        if(!todo) return res.status(404).send('User not found');
        res.send(todo);
    } catch (e){
        res.status(500).send(e);
    }

});

router.delete('/todos/:id', async (req,res,next) => {
    const todoId = req.params.id;
    try{
        const todo = await Todo.findByIdAndDelete(todoId);
        if(!todo) return res.status(404).send('Todo not found');
        res.send(todo);
    } catch (e){
        res.status(500).send(e);
    }

});

module.exports = router