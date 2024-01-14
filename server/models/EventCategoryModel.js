module.exports = (sequelize, DataTypes) => {
    let EventCategoryModel = {};
    EventCategoryModel = sequelize.define('eventCategory', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
}, {
    // Other model options go here
});

return EventCategoryModel;
}