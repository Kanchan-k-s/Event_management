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
          priority: query.priority,
        };
        const result = await EventMemberRel.create(fields);
        // console.log(result);
        // const result2 = await EventMemberRel.findOne(addresult)
        res.status(200).json({
          success: true,
          result,
        });
      } else {
        // console.log(resultCheck);
        let flag = 0;
        resultCheck.forEach((ele) => {
          if (ele.priority < query.priority) {
            flag = 1;
          } else {
            flag = 0;
          }
        });
        if (flag === 1) {
          const fields = {
            eventId: query.eventId,
            memberId: query.memberId,
            status: "enganged",
            priority: query.priority,
          };
          const result = await EventMemberRel.create(fields);
          // console.log(result);
          // const result2 = await EventMemberRel.findOne(addresult)
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
      attributes: ["eventId", "priority"],
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
    const data = await EventMemberRel.findOne({
      where: {
        [Op.and]: [
          {eventId: req.params.eventId, memberId: req.params.memberId},
        ],
      },
    });
    if (data) {
      const result = await EventMemberRel.update(req.body, {
        where: {eventId: req.params.eventId, memberId: req.params.memberId},
      });
      res.status(200).json({
        success: true,
        result,
      });
    } else {
      res.status(200).json({
        success: false,
        msg: "Can't find relation",
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
