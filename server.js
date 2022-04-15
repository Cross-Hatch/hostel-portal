const { name } = require('ejs')
const { urlencoded } = require('express')
const express = require('express')
const app = express()
const fs = require('fs')
const bcrypt = require('bcrypt')
const users = []

app.use(express.urlencoded({extended : false}))
app.get('/', (req,res) => {
    res.writeHead(200, {'Content-Type':'text/html'}, {name:'David'})
    fs.readFile('src/index.html',function(error,data){
        if(error){
            res.writeHead(404)
            res.write("Cannot locate file")
        }
        else{
            res.write(data)
        }
        res.end()
    })
})



app.post('/',(req,res)=>{})

app.get('/complain', (req,res) => {
    res.writeHead(200, {'Content-Type':'text/html'})
    fs.readFile('src/complain.html',function(error,data){
        if(error){
            res.writeHead(404)
            res.write("Cannot locate file")
        }
        else{
            res.write(data)
        }
        res.end()
    })
})

app.get('/dashboard', (req,res) => {
    res.writeHead(200, {'Content-Type':'text/html'})
    fs.readFile('src/dashboard.html',function(error,data){
        if(error){
            res.writeHead(404)
            res.write("Cannot locate file")
        }
        else{
            res.write(data)
        }
        res.end()
    })
})

app.get('/register', (req,res) => {
    res.writeHead(200, {'Content-Type':'text/html'})
    fs.readFile('src/register.html',function(error,data){
        if(error){
            res.writeHead(404)
            res.write("Cannot locate file")
        }
        else{
            res.write(data)
        }
        res.end()
    })
})

app.post('/register',async(req,res)=>{
    try{
        const hiddenPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hiddenPassword
        })
        res.redirect('/index')
    }
    catch{
        res.redirect('/register')
    }
})

app.listen(3002)