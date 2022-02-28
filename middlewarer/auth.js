const jwt = require('jsonwebtoken')
const authConfig=require('../infra/auth.json')



module.exports= (req,res,next)=>{

 

    const authHeader =  req.headers['authorization']
  
    if(! req.headers.authorization)
        return res.status(401).send({error:'No token provided'})

    const parts=authHeader.split(' ')

    if(!parts.length ===2)
        return res.status(401).send({error:'token error'})

    const [schema,token] = parts
    if(!/^Bearer$/i.test(schema))
         return res.status(401).send({error:'token malformatted'})

   
         jwt.verify(token,authConfig.secret,(err,decoded)=>{
             if(err)  return res.status(401).send({error:'token invalid'})

             req.userId=decoded.id
             return next()

         })




}