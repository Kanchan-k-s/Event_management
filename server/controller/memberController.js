const {sequelize, db} = require("../config/dbconfig");

const add = async (req, res) => {
  try {
    const Member = db.MemberModel;
    const query = req.body;
    const result = await Member.create(query);
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
  const Member = db.MemberModel;
  try {
    const result = await Member.findAll({
      where: {
        organizerId: req.params.id,
      },
    });

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

const showAll = async (req, res) => {
  const Member = db.MemberModel;
  try {
    const result = await Member.findAll({});

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
  const Member = db.MemberModel;
  try {
    const data = await Member.findOne({where: {id: req.params.id}});
    if (data) {
      const checkEmail = await Member.findAll({where: {email: req.body.email}});
      if (checkEmail.length === 0) {
        const result = await Member.update(req.body, {
          where: {id: req.params.id},
        });
        res.status(200).json({
          success: true,
          result,
        });
      } else {
        res.status(200).json({
          success: false,
          msg: "Email already exists",
        });
      }
    } else {
      res.status(200).json({
        success: false,
        msg: "Id not present",
      });
    }
  } catch (e) {
    res.status(500).json({
      success: false,
      errors: [{msg: "Server error"}],
    });
  }
};

const del = async (req, res) => {
  const Member = db.MemberModel;
  try {
    const result = await Member.destroy({where: {id: req.params.id}});
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
  showAll,
};
