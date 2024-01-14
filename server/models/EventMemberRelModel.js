module.exports = (sequelize, DataTypes) => {
  let EventMemberRelModel = {};
  EventMemberRelModel = sequelize.define(
    "eventMemberRel",
    {
      //ratings given
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      // Other model options go here
    }
  );
  EventMemberRelModel.removeAttribute("id");

  return EventMemberRelModel;
};
