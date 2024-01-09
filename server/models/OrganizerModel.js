module.exports = (sequelize, DataTypes) => {
    let OrganizerModel = {};
    OrganizerModel = sequelize.define('organizer', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    // Other model options go here
});

return OrganizerModel;
}