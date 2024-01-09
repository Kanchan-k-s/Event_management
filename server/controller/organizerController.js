const { sequelize,db } = require("../config/dbconfig");

const add = async (req, res) => {
    try {
      const organizer = db.OrganizerModel;
      // console.log(db.Models);
      const query = req.body;
      const result = await organizer.create(query);
      res.status(200).json({
        success: true,
        result
    });
    } catch (e) {
      res.status(500).json({
        success: false,
        errors: [{ msg: "Server error" }],
    });
    }
  };

  module.exports = {
    add
  };