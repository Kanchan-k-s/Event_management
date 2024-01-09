const express = require('express')
const organizer= require("../controller/organizerController")

const router = express.Router();


router.post('/add', organizer.add);

router.get('/show', organizer.show);

router.delete('/delete/:id', organizer.del);

router.put('/update/:id',organizer.update);

module.exports = router;