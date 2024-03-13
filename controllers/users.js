const bcrypt = require('bcrypt')
const User = require('../models/user');
const { all } = require('../routes/users');


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

                console.log('-- KASUTAJA EKSISTEERIB');
                    
                    } else {
                            
                        console.log('++ SAI NIME PASAST LABI ++')
                    
                        
                        const passwords = User.findOne({where: {
                            password: req.body.password
                        }})
                            .then(password => {
                                
                                
                                
                                // const Found = req_ex_elems.includes('!','"','#','$','%','&')
                                // const sisaldus = req.body.password.str(Found)

                                const keerukuseCheck = (password) => {
                                    const req_ex_elems = ['!','"','#','$','%','&']

                                    let elemCount = 0
                                    for(let i = 0; i < password.length; i++){
                                        for(let j = 0; j < req_ex_elems.length; j++){
                                            if(password[i] === req_ex_elems[j]){
                                                elemCount++;
                                            }
                                        }
                                    }
                                    if(elemCount > 0){
                                        return true
                                    } return false

                                }
                                
                                
                                if (req.body.password.length  > 10) {
                                    console.log('--LIIGA PIKK PASSWORD--')
                                
                                
                                
                                
                                
                                
                                } else if (keerukuseCheck(req.body.password) == false) {
                                    
                                    console.log('++ WEAK ASS PASS ++')

                                
                                } else {
                                    
                                                    
                                    console.log('++ SAI PASSWORDI SITAST LABI ++')
                                    console.log('Pass: ',req.body.password.length)
                                
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
                            

                    }
                         
                    
                })
                        .catch(error => {
                            console.error("Error occurred:", error);
                        });
        
        }
    });

}


    module.exports = {register}
