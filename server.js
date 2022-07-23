require('dotenv').config()
const express = require('express')

const app = express()

const ejs=require('ejs')
const path = require('path')
const expressLayout=require('express-ejs-layouts')
const PORT = process.env.PORT || 3000
const mongoose=require('mongoose')
const session = require('express-session')
const flash = require('express-flash')
const MongoDbStore=require('connect-mongo')


//Database connection
const url = 'mongodb://localhost:27017/pizza';

// Use connect method to connect to the server
mongoose.connect(url,      err => {
    if(err) throw err;
    console.log('connected to MongoDB')
});

const connection=mongoose.connection;
connection.once('open',()=>{
    console.log('Database connected...');
})
.on('error' ,()=> {
    console.log('Connection failed....');
});

//session store
 let mongoStore= MongoDbStore.create({
    mongoUrl: url,
    collection : 'sessions'
})

//session config
app.use(session({
    secret : process.env.COOKIE_SECRET,
    resave: false,
    store:mongoStore,
    saveUninitialized:false,
    cookie:{maxAge : 1000 * 60*60*24}//24HOUR
}))


app.use(flash())

//global middleware
app.use((req,res,next)=>{
    res.locals.session=req.session
    next()
})


//assets
app.use(express.static('public'))
app.use(express.json())

//set Template engine
app.use(expressLayout)
app.set('views',path.join(__dirname,'/resources/views'))
app.set('view engine','ejs')

//routes
require('./routes/web')(app)



app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`)
})