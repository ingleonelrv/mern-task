const router=require('express').Router()

router.get('/',(req,res)=>{
    res.json({
        status:'Json works!'
    })
})
module.exports=router