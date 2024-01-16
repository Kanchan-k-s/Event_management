const {sequelize, db} = require("../config/dbconfig");

const add = async (req, res) => {
  try {
    const Event = db.EventModel;
    const query = req.body;
    const {start_date, end_date, start_time, end_time} = req.body;

    // Check if start_date is less than end_date
    if (start_date > end_date) {
      return res.status(200).json({
        success: false,
        msg: "Start date must be before end date",
      });
    }

    // If start_date and end_date are the same, compare start_time and end_time
    if (start_date === end_date && start_time >= end_time) {
      return res.status(200).json({
        success: false,
        msg: "Start time must be before end time on the same date",
      });
    }
    const result = await Event.create(query);
    res.status(200).json({
      success: true,
      result,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      errors: [{msg: "Server error"}],
    });
  }
};

const showByOrganizer = async (req, res) => {
  const Event = db.EventModel;
  // console.log(req.params.id);
  try {
    const result = await Event.findAll({where: {organizerId: req.params.id}});

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
  const Event = db.EventModel;

  try {
    const result = await Event.findAll();
    // console.log(result);
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
  const Event = db.EventModel;
  try {
    // console.log(req.body);
    const data = await Event.findOne({where: {id: req.params.id}});
    if (data) {
      const result = await Event.update(req.body, {
        where: {id: req.params.id},
      });
      res.status(200).json({
        success: true,
        result,
      });
    } else {
      res.status(200).json({
        success: false,
        msg: "Can't find the id",
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      errors: [{msg: "Server error"}],
    });
  }
};

const del = async (req, res) => {
  const Event = db.EventModel;
  try {
    const result = await Event.destroy({where: {id: req.params.id}});
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
  showByOrganizer,
};
