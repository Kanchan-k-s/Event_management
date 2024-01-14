module.exports = (sequelize, DataTypes) => {
    let MemberModel = {};
    MemberModel = sequelize.define('member', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    // Other model options go here
});

return MemberModel;
}