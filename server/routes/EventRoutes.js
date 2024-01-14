const express = require("express");
const event = require("../controller/eventController");

const router = express.Router();

router.post("/add", event.add);

router.get("/show", event.show);
router.get("/organizer/:id", event.showByOrganizer);

router.delete("/delete/:id", event.del);

router.put("/update/:id", event.update);

module.exports = router;
