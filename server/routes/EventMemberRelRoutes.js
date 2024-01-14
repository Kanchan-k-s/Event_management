const express = require("express");
const eventMemberRel = require("../controller/eventMemberRelController");

const router = express.Router();

router.post("/add", eventMemberRel.add);

router.get("/show", eventMemberRel.show);
router.get("/member/:id", eventMemberRel.memberEvents);

// router.delete("/delete/:id", eventMemberRel.del);

router.put("/update/:id", eventMemberRel.update);

router.post("/cancel", eventMemberRel.del);

module.exports = router;
