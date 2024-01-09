module.exports = (sequelize, DataTypes) => {
    let EventModel = {};
    EventModel = sequelize.define('event', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    start_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    end_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    start_time: {
        type: DataTypes.TIME,
        allowNull: false
    },
    end_time: {
        type: DataTypes.TIME,
        allowNull: false
    },
    color:{
        type: DataTypes.STRING,
        allowNull: false
    },
    desc:{
        type: DataTypes.STRING,
        allowNull: false
    },
    status:{
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    // Other model options go here
});

return EventModel;
}