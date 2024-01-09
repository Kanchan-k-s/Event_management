const { sequelize,db } = require("../config/dbconfig");

const add = async (req, res) => {
    try {
      const EventMemberRel = db.EventMemberRelModel;
      const query = req.body;
      const result = await EventMemberRel.create(query);
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
    const EventMemberRel = db.EventMemberRelModel;
  
    try {
      const result = await EventMemberRel.findAll();
      
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
  const EventMemberRel = db.EventMemberRelModel;
  try {
    const data = await EventMemberRel.findOne({ where: { id: req.params.id } });
    if (data) {
      const result = await EventMemberRel.update(req.body, {
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
  const EventMemberRel = db.EventMemberRelModel;
  try {
    const result = await EventMemberRel.destroy({ where: { id: req.params.id } });
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