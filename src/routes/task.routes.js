const router=require('express').Router()
//importo el schema para hacer consultas a la BD
const Task = require('../models/task')

router.get('/',async (req,res)=>{
    const task=await Task.find()
    console.log(task)
    res.json(task)
})
router.get('/:id',async (req,res)=>{
    const task=await Task.findById(req.params.id)
    console.log(task)
    res.json(task)
})
router.post('/',async (req,res)=>{
    //voy a obtener lo que me envia el cliente
    const {title,description}=req.body
    //creo una nueva tarea como instancia del modelo
    const task=new Task({title,description})
    //GUARDAR EN MONGODB
    await task.save()
    res.json({'status':'task saved'})
})
router.put('/:id',async (req,res)=>{
    const {title,description} = req.body
    const task= {title,description}
    await Task.findByIdAndUpdate(req.params.id,task)
    res.json({status:'Task updated'})
})
router.delete('/:id',async (req,res)=>{
    await Task.findByIdAndDelete(req.params.id)
    res.json({status:'Task deleted'})
})
module.exports=router