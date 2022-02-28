const express = require('express')
const cors = require('cors')
const app = express()
const body_parser = require("body-parser");



app.use(cors())
app.use(body_parser.json())
app.use(body_parser.urlencoded({extended:false}))

app.get("/",(req,res)=>{
        res.send("ok")
})

require('./controller/authController')(app)
require('./controller/dwController')(app)



app.listen(3000)