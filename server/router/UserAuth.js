const express=require('express')
const User = require('../model/User.model')
require('dotenv').config()
;
const router=express.Router();

router.get('/',(req,res)=>{
    if (req.body){
        res.send(req.body)
    }
})

router.post('/', async (req, res) => {
    const { tokenId,name,picture,email } = req.body;
    console.log(req.body)
    if (tokenId) {
        const existingData=await User.findOne({ tokenId: tokenId })
        if(existingData){
            console.log("exis");
            return res.json(existingData)
        }
        // console.log(tokenId)
        else{
            try{
                const newUser = await User.create({
                    name,
                    email,
                    picture,
                    tokenId
                });
                res.status(200).json({success: true,data: newUser})
            }
            catch(err){
                res.status(500).json({success: false})
            }
        }
        }
//     
})
router.post('/verify',async (req,res)=>{
            const {tokenId} = req.body;
            if (tokenId){
                const existingData=await User.findOne({tokenId: tokenId});
                if (existingData){
                    console.log("plokjhbgvc")
                    return res.json({ok: true,data: existingData});
                }
                else{
                    return res.json({ok: false})
                }
            }
        })

module.exports=router;