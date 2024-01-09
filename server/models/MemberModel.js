module.exports = (sequelize, DataTypes) => {
    let MemberModel = {};
    MemberModel = sequelize.define('member', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    // Other model options go here
});

return MemberModel;
}