if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const app = express()
const fs = require('fs')
const bcrypt = require('bcrypt')
const flash = require('express-flash')
const session = require('express-session')
const passport = require('passport')
const initializePassport = require('./passport-config')
const MethodOverride = require('method-override')

initializePassport(
    passport,
    email =>users.find(user => user.email === email),
    id =>users.find(user => user.id === id)
)

const users = []


app.use(express.urlencoded({extended : false}))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized:false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(MethodOverride('_method'))

app.get('/',CheckNotAuthenticated,(req,res) => {
    res.writeHead(200, {'Content-Type':'text/html'}, {name:req.user.name})
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



app.post('/',CheckNotAuthenticated, passport.authenticate('local',{
    successRedirect:'/dashboard',
    failureRedirect:'/',
    failureFlash: true
}))

app.get('/complain',CheckAuthenticated, (req,res) => {
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

app.get('/dashboard',CheckAuthenticated, (req,res) => {
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
        res.redirect('/dashboard')
    }
    catch{
        res.redirect('/login')
        
    }
    console.log(users)
})

app.delete('/logout', (req,res) =>{
    req.logOut()
    req.redirect('/')
})

function  CheckAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect('/')
}
function  CheckNotAuthenticated(req, res, next){
    if(req.isAuthenticated()){
       return res.redirect('/dashboard')
    }
    next()
}


app.listen(3002)