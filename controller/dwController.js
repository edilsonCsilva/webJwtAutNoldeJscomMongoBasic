const express=require("express")
const router =express.Router()
const authmiddleware = require("../middlewarer/auth")


router.use(authmiddleware)

router.get("/",async (req,res)=>{
    res.send("OK")
})





module.exports=app => app.use("/dwstilldistribuidora",router)
