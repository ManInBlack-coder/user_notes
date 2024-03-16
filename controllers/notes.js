const bcrypt = require('bcrypt')
const User = require('../models/user');
const Notes = require('../models/notes')
const { use } = require('../routes/users');


const makeNotes = (req,res) => {
    this.notes.findAll({
        include: [{
            model: User,
            as: 'user',
            attributes: ['username','email']
        }]
    })

    .then((notes) =>{
        res.json(notes);
    })
}

const getAllNotes = (req,res) => {
    console.log(req.body);
    Notes.create
}

module.exports = {
    makeNotes,
    getAllNotes
} 