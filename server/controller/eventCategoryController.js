const { sequelize,db } = require("../config/dbconfig");

const add = async (req, res) => {
    try {
      const EventCategory = db.EventCategoryModel;
      const query = req.body;
      const result = await EventCategory.create(query);
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
    const EventCategory = db.EventCategoryModel;
  
    try {
      const result = await EventCategory.findAll();
      
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
  const EventCategory = db.EventCategoryModel;
  try {
    const data = await EventCategory.findOne({ where: { id: req.params.id } });
    if (data) {
      const result = await EventCategory.update(req.body, {
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
  const EventCategory = db.EventCategoryModel;
  try {
    const result = await EventCategory.destroy({ where: { id: req.params.id } });
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