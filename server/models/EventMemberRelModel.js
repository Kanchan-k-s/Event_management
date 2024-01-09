module.exports = (sequelize, DataTypes) => {
    let EventMemberRelModel = {};
    EventMemberRelModel = sequelize.define('eventMemberRel', {
    status:{
        type: DataTypes.STRING,
        allowNull: false
    },
    // eventId:{
    //     type: DataTypes.STRING,
    //     allowNull: false,
    //     primaryKey: true
    // }
}, {
    // Other model options go here
});
EventMemberRelModel.removeAttribute('id');


return EventMemberRelModel;
}