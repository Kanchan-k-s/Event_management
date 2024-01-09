const express = require('express')
const eventCategory= require("../controller/eventCategoryController")

const router = express.Router();


router.post('/add', eventCategory.add);

router.get('/show', eventCategory.show);

router.delete('/delete/:id', eventCategory.del);

router.put('/update/:id',eventCategory.update);

module.exports = router;