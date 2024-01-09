const express = require('express')
const member= require("../controller/memberController")

const router = express.Router();


router.post('/add', member.add);

router.get('/show', member.show);

router.delete('/delete/:id', member.del);

router.put('/update/:id',member.update);

module.exports = router;