const express = require('express')
const router = express.Router()

const {makeNotes,getAllNotes} = require('../controllers/notes')

router.post('/make', makeNotes);
router.get('/getAll',getAllNotes);

module.exports = router