const express = require('express')
const sessions = require('express-session')

const sequelize = require('./utils/db')
const path = require('path')

User = require('./models/user')
User.sync()

const app = express()

//app.set('view engine','express')


app.use(sessions({
    secret: 'thisismysecretkey',
    saveUnitialized:true,
    cookie: {maxAge: 1000 * 60 * 60 * 24},
    resave:false

}));

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'views')));





const userRoutes = require('./routes/users')
app.use('/users',userRoutes)



app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,'views','index.html'))
})


app.listen(3013, () => {
    console.log('PORT 3013')
})