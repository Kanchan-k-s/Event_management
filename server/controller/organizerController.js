const {sequelize, db, Op} = require("../config/dbconfig");

const add = async (req, res) => {
  try {
    const organizer = db.OrganizerModel;
    const query = req.body;
    const result = await organizer.create(query);
    res.status(200).json({
      success: true,
      result,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      errors: [{msg: "Server error"}],
    });
  }
};

const show = async (req, res) => {
  const organizer = db.OrganizerModel;

  try {
    const result = await organizer.findAll();

    res.status(200).json({
      success: true,
      result,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      errors: [{msg: "Server error"}],
    });
  }
};

const update = async (req, res) => {
  const organizer = db.OrganizerModel;
  try {
    const data = await organizer.findOne({where: {id: req.params.id}});
    if (data) {
      if (data.url !== req.body.url) {
        //Check for duplicate url
        const query = await organizer.findAndCountAll({
          where: {url: req.body.url},
        });
        if (query.count === 0) {
          const result = await organizer.update(req.body, {
            where: {id: req.params.id},
          });
          res.status(200).json({
            success: true,
            result,
          });
        } else {
          res.status(200).json({
            success: false,
            msg: "Duplicate Url present",
          });
        }
      } else {
        res.status(200).json({
          success: false,
          msg: "No change in the data",
        });
      }
    }
    return "No such Id present";
  } catch (e) {
    res.status(500).json({
      success: false,
      errors: [{msg: "Server error"}],
    });
  }
};

const del = async (req, res) => {
  const organizer = db.OrganizerModel;
  try {
    const result = await organizer.destroy({where: {id: req.params.id}});
    res.status(200).json({
      success: true,
      result,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      errors: [{msg: "Server error"}],
    });
  }
};

const showById = async (req, res) => {
  const organizer = db.OrganizerModel;

  try {
    const result = await organizer.findOne({where: {id: req.params.id}});

    res.status(200).json({
      success: true,
      result,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      errors: [{msg: "Server error"}],
    });
  }
};

module.exports = {
  add,
  show,
  update,
  del,
  showById,
};
