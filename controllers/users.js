const bcrypt = require('bcrypt')
const User = require('../models/user')



const register = (req,res) => {
    

    const mysql = require('mysql2')
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'qwerty',
        database: 'user_notes'
    });


    const names = connection.query('SELECT username from users', function(err, results, fields) {
        if(err) {
            console.log('nime tabelist votmisega laks pekki');
            } else {

            console.log('--- SAIN NIMED  ----'); 
        
            User.findOne({ where: { 
                username: req.body.username,
        
            } })
                .then(user => {
                    if (user) {


                        // KUVAB KASUTAJA MIS OLEMAS ON 
                console.log('-- KASUTAJA EKSISTEERIB');
                    
                    } else {
                            
                        console.log('else juhtus')
                    
                            bcrypt.hash(req.body.password, 10, (error, cryptPassword) => {
                            
                            
                                User.create({
                                    username: req.body.username,
                                    email:req.body.email,
                                    password: cryptPassword
                                })
                            
                            console.log(req.session)
                            
                            
                            res.json({
                                message: 'New user is registered',
                                user: register,
                                user_session: req.session.user
                            })
                        
                        })

                    }
                         
                    
                })
                        .catch(error => {
                            console.error("Error occurred:", error);
                        });
        
        }
    });



    const passwords = User.findOne({where: {
        password: req.body.password
    }})
        .then(password => {
            if (password.length  > 10) {
                console.log('--LIIGA PIKK PASSWORD--')
            } else {}
        })









}


    module.exports = {register}
