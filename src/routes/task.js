const express = require('express');
const router = express.Router();
const Task = require('../models/task')

router.get('/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.json({
        'status':200,
        'tasks':tasks
    })
})

router.post('/task', async (req, res) => {
    var task = new Task(req.body);
    await task.save();

    res.json({
        'status':200,
        'msg':"Tarea guardada correctamente."
    })
})

router.get('/task/:id', async (req, res) => {
    let id = req.params.id;
    let task = await Task.findById(id);
    res.json({
        'status':200,
        'msg':"Tarea guardada correctamente.",
        'Tarea' : task
    })
})

router.put('/task/:id', async (req, res) => {
    console.log(req.body);
    let updateTask = {
        "title":req.body.title,
        "description":req.body.description
    }
    await Task.findByIdAndUpdate(req.params.id, updateTask);
    res.json({
        'status':200,
        'msg':"Tarea Actualizada correctamente.",
    })
})

router.delete('/task/:id', async (req, res) => {
    await Task.findByIdAndRemove(req.params.id);
    res.json({
        'status':200,
        'msg':"Tarea Eliminada correctamente.",
    })
})
module.exports = router;
