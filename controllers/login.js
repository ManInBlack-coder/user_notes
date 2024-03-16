const bcrypt = require('bcrypt')
const User = require('../models/user');
const { use } = require('../routes/users');




const login = (req,res) => {
    console.log(req.body);

    User.findOne({
        where: {
            username: req.body.username
        }

    })

    .then((user) => {
        if(!user) {
            console.log('login failed')
        } else {
            bcrypt.compare(req.body.password,user.password, (error, result) => {
                if(result) {
                    req.session.user = {
                        username: user.username,
                        user_id: user.id
                    }

                    console.log('Login succesful')
                
                } else {
                    console.log('LOgin failed')
                }
            })
        }
    })


}

module.exports = {login}