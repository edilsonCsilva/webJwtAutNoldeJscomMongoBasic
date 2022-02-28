const bcrypt = require("bcryptjs")
const express=require("express")
const User=require("../model/User")
const jwt = require("jsonwebtoken")
const router =express.Router()
const authConfig = require("../infra/auth.json")


function generationToken(paramets={}){
    return jwt.sign(paramets,authConfig.secret,{
        expiresIn:86400,
    })

}



router.post('/register',async (req,res)=>{
    const {email} =req.body

    try{
        if(await User.findOne({email}))
            return res.status(400).send({error:"User Já Existe.!"})


        const user=await User.create(req.body)
        user.password=undefined

        return res.send({user,token:generationToken({id:user.id})})
    }catch(e){

        return res.status(400).send({error:'Falha ao Criar Registro..!'})

    }
})

router.post("/authenticate",async (req,res)=>{
    const {email,password} =req.body
    const user=await User.findOne({email}).select("+password")
    if(!user)
     return res.status(400).send({error:"Usuario não Localizado.!"})

    if(!await bcrypt.compare(password,user.password))
        return res.status(400).send({error:"Senha Invalida.!"})

    user.password=undefined
     res.send({user,token:generationToken({id:user.id})})
})



module.exports= app =>app.use('/auth',router)
 