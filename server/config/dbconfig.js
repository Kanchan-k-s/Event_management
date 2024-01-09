
const { Sequelize, DataTypes } = require("sequelize")
require('dotenv').config()
const sequelize = new Sequelize(process.env.LOCALURI,{
  dialect: 'postgres',
  logging: false, 
  // Set to true if you want to see SQL logs in the console
  timezone: '+05:30', // Set Indian Standard Time (IST) UTC offset (+05:30)
})

const db = {};
const client = {
  query: async (query, params, user_id = null, callback = null) => {
    const _ = await sequelize.authenticate();
    
    db.Sequelize = Sequelize;
    db.sequelize = sequelize;

    db.Models = require("./Models")(sequelize, DataTypes)
    
  },
};

const connectDB = async function () {
  try {
    const connect= await sequelize.authenticate();
    console.log("Successfully connected to the Database.");
    
    db.Sequelize = Sequelize;
    db.sequelize = sequelize;

    //models
    db.OrganizerModel = require("../models/OrganizerModel")(sequelize, DataTypes)
    db.EventCategoryModel = require("../models/EventCategoryModel")(sequelize, DataTypes)
    db.EventModel = require("../models/EventModel")(sequelize, DataTypes)
    db.MemberModel = require("../models/MemberModel")(sequelize, DataTypes)
    db.EventMemberRelModel = require("../models/EventMemberRelModel")(sequelize, DataTypes)

    //relations
    db.OrganizerModel.hasMany(db.MemberModel);
    db.OrganizerModel.hasMany(db.EventModel);
    db.EventCategoryModel.hasMany(db.EventModel);
    db.EventModel.hasMany(db.EventMemberRelModel);
    db.MemberModel.hasMany(db.EventMemberRelModel);

    sequelize.sync({ force: true })
  } catch (error) {
    console.log("Error in connecting to the database .", error);
  }
};

module.exports = { sequelize, connectDB, client, db };