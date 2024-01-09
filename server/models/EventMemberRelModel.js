module.exports = (sequelize, DataTypes) => {
    let EventMemberRelModel = {};
    EventMemberRelModel = sequelize.define('eventMemberRel', {
    status:{
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    // Other model options go here
});

return EventMemberRelModel;
}