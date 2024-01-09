const { sequelize,db } = require("../config/dbconfig");

const add = async (req, res) => {
    try {
      const Event = db.EventModel;
      const query = req.body;
      const result = await Event.create(query);
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

  const show = async (req, res) => {
    const Event = db.EventModel;
  
    try {
      const result = await Event.findAll();
      
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


const update = async (req, res) => {
  const Event = db.EventModel;
  try {
    const data = await Event.findOne({ where: { id: req.params.id } });
    if (data) {
      const result = await Event.update(req.body, {
        where: { id: req.params.id },
      });
      res.status(200).json({
        success: true,
        result
    });
    }
    return "No such Id present";
  } catch (e) {
    res.status(500).json({
      success: false,
      errors: [{ msg: "Server error" }],
  });
  }
};

const del = async (req, res) => {
  const Event = db.EventModel;
  try {
    const result = await Event.destroy({ where: { id: req.params.id } });
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
    add,
    show,
    update,
    del
  };