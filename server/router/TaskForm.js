const express=require('express');
const Task=require('../model/Task.model')

const router=express.Router();

router.post('/',async(req,res)=>{
    const {emailId,title,description,tid,date,time,important,completed}= req.body;
    try {
        const newTask= await Task.create({
            emailId,
            title,
            description,
            tid,
            date,
            time,
            important,
            completed
        });
        res.status(200).json({success: true,data:newTask})
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})

router.post('/all',async(req,res)=>{
    const {emailId}=req.body;
    const data=await Task.find({emailId})
    if (data){
        return res.json(data)
    }
    else{
        return res.json({data:null})
    }
})

router.post('/important',async(req,res)=>{
    const {emailId}=req.body;
    const data= await Task.find({emailId,important:true})
    if (data){
        return res.json(data)
    }
    else{
        return res.json({data:null})
    }

})

router.post('/completed',async(req,res)=>{
    const {emailId}=req.body;
    const data= await Task.find({emailId,completed:true})
    if (data){
        return res.json(data)
    }
    else{
        return res.json({data:null})
    }
})

router.post('/uncompleted',async(req,res)=>{
    const {emailId}=req.body;
    const data= await Task.find({emailId,completed:false})
    if (data){
        return res.json(data)
    }
    else{
        return res.json({data:null})
    }
})

router.post("/today's",async(req,res)=>{
    const today = new Date();
    today.setHours(0, 0, 0, 0); 
    console.log(today);
    const {emailId}=req.body;
    const data= await Task.find({emailId,date: {$gte: today, $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000) }})
    if (data){
        return res.json(data)
    }
    else{
        return res.json({data:null})
    }
})

router.all("/update/important",async(req,res)=>{
    const {emailId,_id,important}=req.body
    const das=await Task.findByIdAndUpdate(_id, { important: !important },{new: true})
    if (das){
        console.log(das)
        return res.json(das)
    }
    else {
        return res.json(null)
    }
    
})
router.all("/update/completed",async(req,res)=>{
    const {emailId,_id,completed}=req.body
    const das=await Task.findByIdAndUpdate(_id, { completed: !completed },{new: true})
    if (das){
        console.log(das)
        return res.json(das)
    }
    else {
        return res.json(null)
    }
    
})
router.post('/delete',async(req,res)=>{
    const {_id}=req.body
    const data=await Task.findByIdAndDelete(_id)
    if (data){
        return res.json(data)
    }
    else{
        return res.json({data:null})
    }
})

router.post('/search',async(req,res)=>{
    const {emailId,searchTerm}=req.body
    const data = await Task.find({emailId,title: { "$regex": searchTerm}})
    if (data) {
        return res.json(data)
    }
    else {
        return res.json({data:null})
    }
})

module.exports=router;
