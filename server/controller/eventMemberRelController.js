const {sequelize, db, Op} = require("../config/dbconfig");
const {checkSlot} = require("../Query/queries");

const add = async (req, res) => {
  try {
    const EventMemberRel = db.EventMemberRelModel;
    const Event = db.EventModel;
    const Member = db.MemberModel;
    const query = req.body;

    //Condition Check for the person attending the same meeting
    const find = await EventMemberRel.findAll({
      where: {
        [Op.and]: [
          {
            eventId: query.eventId,
            memberId: query.memberId,
          },
        ],
      },
    });
    //Check the same event
    if (find.length <= 0) {
      const {id, start_date, end_date, start_time, end_time, time_zone} =
        await Event.findOne({
          where: {id: query.eventId},
        });
      //checks that the date falls in the follow block
      // rel.start_date on or after the start_date and on or before the end_date
      // rel.end_date is on or after the startDate and on or before the endDate
      // It checks that the rel.start_date is on or before the startDate,
      // and the rel.end_date is on or after the specified endDate
      const resultCheck = await checkSlot(
        query.memberId,
        start_date,
        end_date,
        start_time,
        end_time,
        time_zone
      );

      if (resultCheck.length === 0) {
        const fields = {
          eventId: query.eventId,
          memberId: query.memberId,
          status: "enganged",
        };
        const result = await EventMemberRel.create(fields);
        res.status(200).json({
          success: true,
          result,
        });
      } else {
        res.status(200).json({
          success: false,
          msg: "You are engaged in another event at the same time",
        });
      }
    } else {
      res.status(200).json({
        success: false,
        msg: "Can't attend the same event twice",
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

const memberEvents = async (req, res) => {
  const EventMemberRel = db.EventMemberRelModel;
  try {
    const result = await EventMemberRel.findAll({
      where: {memberId: req.params.id},
      attributes: ["eventId"],
    });
    // console.log(result);
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

const show = async (req, res) => {
  const EventMemberRel = db.EventMemberRelModel;

  try {
    const result = await EventMemberRel.findAll();

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
  const EventMemberRel = db.EventMemberRelModel;
  try {
    const data = await EventMemberRel.findOne({where: {id: req.params.id}});
    if (data) {
      const result = await EventMemberRel.update(req.body, {
        where: {id: req.params.id},
      });
      res.status(200).json({
        success: true,
        result,
      });
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
  const EventMemberRel = db.EventMemberRelModel;
  try {
    const result = await EventMemberRel.destroy({
      where: {
        [Op.and]: [{eventId: req.body.eventId, memberId: req.body.memberId}],
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

module.exports = {
  add,
  show,
  update,
  del,
  memberEvents,
};
