const express = require('express')
const sequelize = require('./utils/db')
const sessions = require('express-session')

const User = require('./models/user')
User.sync()

const app = express()

app.use(sessions({
    secret: 'thisismysecretkey',
    saveUnitialized:true,
    cookie: {maxAge: 1000 * 60 * 60 * 24},
    resave:false
}));

app.use(express.json())
app.use(express.urlencoded({extended:true}))


const userRoutes = require('./routes/users')
app.use('/users',userRoutes)

app.get('/',(req,res) => {
    res.render('index')
})

app.listen(3013, () => {
    console.log('PORT 3013')
})